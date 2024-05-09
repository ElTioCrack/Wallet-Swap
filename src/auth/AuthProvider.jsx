import React, { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  getAccessToken: () => {},
  getRefreshToken: () => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    // Aquí podrías hacer alguna lógica de verificación de autenticación inicial, si es necesario
  }, []);

  const login = (accessToken, refreshToken) => {
    setToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsLoggedIn(true);

    console.log(`accessToken: ${accessToken}`);
    console.log(`RefreshToken: ${refreshToken}`);
  };

  const logout = () => {
    // setToken(token);
    // setRefreshToken(refreshToken);
    // localStorage.removeItem("token");
    // localStorage.removeItem("refreshToken");

    setIsLoggedIn(false);
  };

  const getAccessToken = () => {
    return accessToken;
  }

  const getRefreshToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const { refreshToken } = JSON.parse(accessToken);
      return refreshToken;
    }
    return null;
  }

  async function checkAuth () {
    if (accessToken) {

    } else {
      const token = getRefreshToken()
      if (token) {
        const newAccessToken = await requestNewAccessToken();
        if (newAccessToken) {
          login(newAccessToken, token);
        } else {
          logout();
        }
      }
    }
  }

  async function requestNewAccessToken () {
    try {
      const fakeNewAccessToken = 'fake_new_access_token';
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fakeNewAccessToken;
    } catch (error) {
      console.error('Error requesting new access token:', error);
      return null;
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, getAccessToken, getRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthProvider, useAuth };
