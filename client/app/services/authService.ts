import axios from "axios";
import { AuthFormData } from "../types/form-data";

// Base URL for the authentication API
const API_URL = "http://localhost:5000/auth";

// Helper function to get the token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// Login function
export const login = async (formData: AuthFormData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/auth/login",
      formData
    );
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("name", response.data.name);
    localStorage.setItem("email", response.data.email);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const fetchUserProfile = async (token: string) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
