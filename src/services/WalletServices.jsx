import AccessWalletService from "./authentication/AccessWalletService";
import WalletCreationService from "./authentication/WalletCreationService";

const fetchWalletInfo = async () => {
    try {
        // Simula una solicitud exitosa para obtener información de la billetera
        const walletInfo = {
            _id: 654213,
            walletName: "Main Wallet",
        };
        return walletInfo;
    } catch (error) {
        console.error("Error getting wallet info:", error);
        throw error;
    }
};

const requestNewAccessToken = async () => {
    try {
        // Simula una solicitud exitosa para obtener un nuevo token de acceso
        const fakeNewAccessToken = "fake_new_access_token";
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return fakeNewAccessToken;
    } catch (error) {
        console.error("Error requesting new access token:", error);
        return null;
    }
};

export { WalletCreationService, AccessWalletService, fetchWalletInfo, requestNewAccessToken };
