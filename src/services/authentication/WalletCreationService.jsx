import BaseUrl from "../ApiConfig";
import axios from "axios";

// const CreateWalletService = async (walletData) => {
//   try {
//     const response = await axios.post(`${BaseUrl}/wallets`, walletData);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating wallet:", error);
//     throw error;
//   }
// };

const CreateWalletService = async (walletData) => {
  try {
    // Simula una conexión exitosa al backend y devuelve un JWT
    const fakeJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    return { success: true, message: "Wallet created successfully", data: fakeJwt };
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw error;
  }
};

export default CreateWalletService;