import React, { useContext, createContext, useState, useEffect } from "react";
import {
    fetchWalletInfo,
    requestNewAccessToken,
} from "../services/WalletServices.jsx";

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
    const [walletInfo, setWalletInfo] = useState(null);
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    useEffect(() => {
        checkAuth();
    }, []);

    const getWalletInfo = async () => {
        return walletInfo;
        // if (walletInfo || walletInfo == "" || walletInfo == null) {
        //     return walletInfo;
        // } else {
        //     return await fetchWalletInfo();
        // }
    };

    const getAccessToken = () => accessToken;

    const getRefreshToken = () => refreshToken;

    const login = (newAccessToken, newRefreshToken) => {
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setAccessToken("");
        setRefreshToken("");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
    };

    const checkAuth = async () => {
        try {
            if (!accessToken && refreshToken) {
                const newAccessToken = await requestNewAccessToken();
                if (newAccessToken) {
                    login(newAccessToken, refreshToken);
                } else {
                    logout();
                }
            }
        } catch (error) {
            console.error("Error checking authentication:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
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
