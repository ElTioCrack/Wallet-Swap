import axios from "axios";
import ApiResponse from "../models/ApiResponse";

const endpointUrl = "walletInfo";

async function fetchWalletInfo(accessToken) {
    try {
        const response = await axios.get(`${BaseUrl}${endpointUrl}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const statusCode = response.status;
        const responseData = response.data;

        return new ApiResponse(
            statusCode,
            true,
            responseData.message,
            responseData.data
        );
    } catch (error) {
        console.error("Error en fetchWalletInfo:", error);
        const statusCode = error.response ? error.response.status : 500;
        const errorMessage = error.response ? error.response.data.message : "Internal Server Error";
        return new ApiResponse(
            statusCode,
            false,
            errorMessage,
            null
        );
    }
}

export default fetchWalletInfo;
