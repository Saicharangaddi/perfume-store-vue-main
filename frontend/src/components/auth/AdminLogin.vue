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
            <label class="block text-sm font-medium mb-1">Username</label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                👤
              </span>

              <input
                v-model="email"
                type="text"
                class="w-full pl-9 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your username"
                @input="validateEmail"
              />
            </div>

            <p v-if="emailError" class="text-red-500 text-sm mt-1">
              {{ emailError }}
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
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const emailError = ref("");
const passwordError = ref("");

const validateEmail = () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) emailError.value = "Email is required";
  else if (!regex.test(email.value))
    emailError.value = "Enter a valid email address";
  else emailError.value = "";
};

// Password validation
const validatePassword = () => {
  if (!password.value) passwordError.value = "Password is required";
  else passwordError.value = "";
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Admin login
const onSubmit = async () => {
  validateEmail();
  validatePassword();
  if (emailError.value || passwordError.value) return;

  const { success, role } = await auth.login(email.value, password.value);

  if (success && role === "admin") {
    toast.success("Admin login successful");
    router.push("/admin/dashboard");
  } else if (success) {
    toast.error("Access denied: not an admin");
  } else {
    toast.error("Invalid email or password");
  }
};

const goToUserLogin = () => router.push("/");
</script>
