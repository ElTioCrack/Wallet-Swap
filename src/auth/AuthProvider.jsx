import React, { useContext, createContext, useState, useEffect } from "react";
import {
  fetchWalletInfo,
  verifyRefreshToken,
} from "../services/WalletServices.jsx";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  getWalletInfo: () => [],
  setWalletInfoAsync: () => [],
  getAccessToken: () => {},
  getRefreshToken: () => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletInfo, setWalletInfo] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    console.log(isLoggedIn);
    checkAuth();
  }, []);

  const getWalletInfo = () => walletInfo;

  const setWalletInfoAsync = async (publicKey) => {
    if (isLoggedIn) {
      try {
        const response = await fetchWalletInfo(publicKey);

        setWalletInfo(response.data);

        return response;
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  };

  const getAccessToken = () => accessToken;

  const getRefreshToken = () => refreshToken;

  const login = async (newAccessToken, newRefreshToken) => {
    setIsLoggedIn(true);
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  };

  const logout = () => {
      setWalletInfo(null);
      setAccessToken("");
      setRefreshToken("");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
    console.log("porque? :(");
  };

  const checkAuth = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        // No hay tokens de acceso y/o actualización, cerrar sesión
        return logout();
      }

      const accessTokenExpired = await verifyAccessToken(accessToken);
      if (accessTokenExpired) {
        // El token de acceso ha expirado
        try {
          const newAccessToken = await generateAccessTokenFromRefreshToken(
            refreshToken
          );
          if (!newAccessToken) {
            // No se pudo obtener un nuevo token de acceso, cerrar sesión
            return logout();
          }
          // Verificar si el token de actualización sigue siendo válido
          const refreshTokenValid = await verifyRefreshToken(refreshToken);
          if (!refreshTokenValid) {
            // El token de actualización ya no es válido, cerrar sesión
            return logout();
          }
          // Ambos tokens son válidos, actualizar la sesión de usuario
          return login(newAccessToken, refreshToken);
        } catch (error) {
          // Ocurrió un error al solicitar un nuevo token de acceso, cerrar sesión
          console.error("Error requesting new access token:", error);
          return logout();
        }
      }

      // El token de acceso sigue siendo válido, actualizar la sesión de usuario
      return login(accessToken, refreshToken);
    } catch (error) {
      // Error al verificar la autenticación, cerrar sesión por precaución
      console.error("Error checking authentication:", error);
      return logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        getWalletInfo,
        setWalletInfoAsync,
        getAccessToken,
        getRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthProvider, useAuth };
