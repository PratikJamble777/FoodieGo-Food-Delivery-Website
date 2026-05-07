import { create } from "zustand";
import { api } from "../lib/api";

const savedUser = localStorage.getItem("food_user");
const savedToken = localStorage.getItem("food_token");

export const useAuthStore = create((set) => ({
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  loading: false,
  error: "",
  async login(payload) {
    set({ loading: true, error: "" });
    try {
      const { data } = await api.post("/auth/login", payload);
      localStorage.setItem("food_token", data.token);
      localStorage.setItem("food_user", JSON.stringify(data.user));
      set({ user: data.user, token: data.token, loading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || "Login failed", loading: false });
      return false;
    }
  },
  async register(payload) {
    set({ loading: true, error: "" });
    try {
      const { data } = await api.post("/auth/register", payload);
      localStorage.setItem("food_token", data.token);
      localStorage.setItem("food_user", JSON.stringify(data.user));
      set({ user: data.user, token: data.token, loading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || "Signup failed", loading: false });
      return false;
    }
  },
  logout() {
    localStorage.removeItem("food_token");
    localStorage.removeItem("food_user");
    set({ user: null, token: null, error: "" });
  }
}));
