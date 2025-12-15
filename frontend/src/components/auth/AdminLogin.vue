<template>
  <div class="flex min-h-screen">
    <!-- LEFT SIDE -->
    <div class="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
      <h1 class="text-3xl font-semibold text-gray-700">Admin Portal</h1>
    </div>

    <!-- RIGHT SIDE -->
    <div class="flex w-full md:w-1/2 items-center justify-center p-6">
      <div class="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold text-center mb-4">Admin Login</h2>

        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- ADMIN ID -->
          <div>
            <label class="block text-sm font-medium mb-1">Admin ID</label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                👤
              </span>

              <input
                v-model="username"
                type="text"
                class="w-full pl-9 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter Admin ID"
                @input="validateAdminId"
              />
            </div>

            <p v-if="adminIdError" class="text-red-500 text-sm mt-1">
              {{ adminIdError }}
            </p>
          </div>

          <!-- PASSWORD -->
          <div>
            <label class="block text-sm font-medium mb-1">Password</label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                🔒
              </span>

              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full pl-9 pr-9 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter password"
                @input="validatePassword"
              />

              <span
                v-if="password"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer text-sm"
                @click="togglePasswordVisibility"
              >
                {{ showPassword ? "🙈" : "👁️" }}
              </span>
            </div>

            <p v-if="passwordError" class="text-red-500 text-sm mt-1">
              {{ passwordError }}
            </p>
          </div>

          <!-- LOGIN BUTTON -->
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Log in
          </button>
        </form>
        <!-- USER LOGIN -->
        <div class="text-center mt-4">
          <button
            @click="goToUserLogin"
            class="text-blue-600 hover:underline text-sm"
          >
            User Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRouter();

const username = ref("");
const password = ref("");
const showPassword = ref(false);

const adminIdError = ref("");
const passwordError = ref("");

// Admin ID validation (1 letter + 6 digits)
const validateAdminId = () => {
  const regex = /^[A-Za-z][0-9]{6}$/;

  if (!username.value) {
    adminIdError.value = "Admin ID is required";
  } else if (!regex.test(username.value)) {
    adminIdError.value = "Admin ID must be 1 letter + 6 digits (e.g., a290832)";
  } else {
    adminIdError.value = "";
  }
};

// Password validation (same as user login)
const validatePassword = () => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!password.value) {
    passwordError.value = "Password is required";
  } else if (!regex.test(password.value)) {
    passwordError.value =
      "Password must be 6+ chars, include letters, numbers & special characters";
  } else {
    passwordError.value = "";
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const loginAdmin = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/login/`,
      {
        username: username.value,
        password: password.value,
      }
    );

    if (response.data.success) {
      toast.success("Admin login successful");
      router.push("/admin/dashboard");
    } else {
      toast.error("Invalid username or password");
    }
  } catch (error) {
    toast.error("Login failed. Try again.");
  }
};

const onSubmit = () => {
  validateAdminId();
  validatePassword();

  if (adminIdError.value || passwordError.value) return;

  loginAdmin();
};
const goToUserLogin = () => {
  router.push("/");
};
</script>
