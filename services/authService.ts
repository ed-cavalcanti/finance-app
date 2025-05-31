import * as SecureStore from "expo-secure-store";
import api from "./api";

export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  accessToken: string;
}

export const register = async (
  userData: CreateUserInput
): Promise<UserResponse> => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error in registration:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Erro ao registrar usuário");
  }
};

export const login = async (
  credentials: LoginUserInput
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    if (response.data.accessToken) {
      await SecureStore.setItemAsync("userToken", response.data.accessToken);
    }
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error);
    throw error.response?.data || new Error("Email ou senha inválidos");
  }
};

export const logout = async (): Promise<void> => {
  await SecureStore.deleteItemAsync("userToken");
};

export const getMe = async (): Promise<UserResponse> => {
  try {
    const response = await api.get<UserResponse>("/auth/me");
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching user data:",
      error.response?.data || error.message
    );
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync("userToken");
    }
    throw (
      error.response?.data || new Error("Erro ao recuperar dados do usuário")
    );
  }
};
