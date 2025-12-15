import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import { useCartStore } from "./useCartStores";

export const useAuthStore = defineStore(
  "auth",
  () => {
    // State
    const user = ref(null); // normal user
    const admin = ref(null); // admin user
    const cart = useCartStore();
    // Getters
    const isUserAuthenticated = computed(() => !!user.value);
    const isAdminAuthenticated = computed(() => !!admin.value);

    // USER LOGIN
    async function loginUser(username, password) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/accounts/login/`,
          {
            username,
            password,
          }
        );

        if (response.data.success) {
          user.value = response.data.username;
          return { success: true };
        }

        return { success: false };
      } catch (error) {
        console.error("User login failed:", error);
        return { success: false };
      }
    }

    // ADMIN LOGIN
    async function loginAdmin(username, password) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/accounts/admin/login/`,
          {
            username,
            password,
          }
        );

        if (response.data.success) {
          admin.value = username;
          return { success: true };
        }

        return { success: false };
      } catch (error) {
        console.error("Admin login failed:", error);
        return { success: false };
      }
    }

    // LOGOUT
    function logoutUser() {
      user.value = null;
      cart.clearCart();
    }

    function logoutAdmin() {
      admin.value = null;
    }

    return {
      user,
      admin,
      isUserAuthenticated,
      isAdminAuthenticated,
      loginUser,
      loginAdmin,
      logoutUser,
      logoutAdmin,
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
