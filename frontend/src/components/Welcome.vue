<template>
  <div class="flex min-h-screen">
    <!-- LEFT SIDE IMAGE -->
    <div class="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
      <img src="../assets/product 6.png" alt="Perfume Banner" class="w-[95%]
      h-[100%] object-contain rounded-lg shadow" " />
    </div>

    <!-- RIGHT SIDE LOGIN FORM -->
    <div class="flex w-full md:w-1/2 items-center justify-center p-6">
      <div class="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold text-center mb-4">Sign in</h2>

        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- USERNAME -->
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

            <!-- Inline error -->
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
                placeholder="Enter your password"
                @input="validatePassword"
              />

              <!-- Eye icon -->
              <span
                v-if="password"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer text-sm"
                @click="togglePasswordVisibility"
              >
                {{ showPassword ? "🙈" : "👁️" }}
              </span>
            </div>

            <!-- Inline error -->
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

        <!-- ADMIN LOGIN -->
        <div class="text-center mt-4">
          <button
            @click="goToAdminLogin"
            class="text-blue-600 hover:underline text-sm"
          >
            Admin Login
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
import { useAuthStore } from "../stores/auth";

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

const validatePassword = () => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!password.value) passwordError.value = "Password is required";
  else if (!regex.test(password.value))
    passwordError.value =
      "Password must be 6+ chars, include letters, numbers & special characters";
  else passwordError.value = "";
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = async () => {
  validateEmail();
  validatePassword();
  if (emailError.value || passwordError.value) return;

  const result = await auth.login(email.value, password.value);

  if (result.success) {
    toast.success("Login successful");

    if (result.role === "user") router.push("/home");
    else if (result.role === "admin") router.push("/admin/dashboard");
  } else {
    toast.error("Invalid email or password");
  }
};

const goToAdminLogin = () => router.push("/admin/login");
</script>
