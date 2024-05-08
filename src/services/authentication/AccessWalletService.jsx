import BaseUrl from "../ApiConfig";
import axios from "axios";

const login = async (userData) => {
  try {
    const response = await axios.post(`${BaseUrl}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export { login };
