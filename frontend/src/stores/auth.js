import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import { useCartStore } from "./useCartStores";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref(null);
    const cart = useCartStore();

    const isAuthenticated = computed(() => !!user.value);
    const isUser = computed(() => user.value?.role === "user");
    const isAdmin = computed(() => user.value?.role === "admin");

    async function login(email, password) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          { email, password }
        );

        const userData = response.data.user;
        const token = response.data.token;

        if (userData && token) {
          user.value = userData;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          return { success: true, role: userData.role };
        }
        return { success: false };
      } catch (error) {
        console.error("Login failed:", error);
        return { success: false };
      }
    }

    // LOGOUT
    function logout() {
      user.value = null;
      localStorage.removeItem("token");
      cart.clearCart();
      delete axios.defaults.headers.common["Authorization"];
    }

    return {
      user,
      isAuthenticated,
      isUser,
      isAdmin,
      login,
      logout,
    };
  },
  {
    persist: {
      strategies: [
        {
          key: "auth",
          storage: localStorage,
        },
      ],
    },
  }
);
