import React, { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Aquí podrías hacer alguna lógica de verificación de autenticación inicial, si es necesario
  }, []);

  const login = () => {
    // Aquí iría la lógica para iniciar sesión
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Aquí iría la lógica para cerrar sesión
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthProvider, useAuth };
