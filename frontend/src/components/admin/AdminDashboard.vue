<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- SIDEBAR -->
    <aside class="w-64 bg-pink-950 text-white flex flex-col p-6 space-y-6">
      <h2 class="text-xl font-semibold mb-4">Admin Panel</h2>

      <nav class="space-y-4">
        <button @click="goTo('dashboard')" class="hover:text-pink-300">
          Dashboard
        </button>
        <br />
        <button @click="goTo('add')" class="hover:text-pink-300">
          Add Perfume
        </button>
        <br />
        <button @click="goTo('manage')" class="hover:text-pink-300">
          Manage Perfumes
        </button>
      </nav>

      <button
        @click="logout"
        class="mt-auto text-sm text-gray-300 hover:text-white"
      >
        Logout
      </button>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 p-6">
      <!-- HEADER -->
      <header class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-[#3B0A45]">Welcome, Admin</h1>

        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-600">admin@perfume.com</span>
          <img src="/images/product 11.png" class="w-8 h-8 rounded-full" />
        </div>
      </header>

      <!-- STATS -->
      <section class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white shadow rounded-lg p-4 text-center">
          <h3 class="text-sm text-gray-500">Total Perfumes</h3>
          <p class="text-xl font-bold text-[#3B0A45]">128</p>
        </div>

        <div class="bg-white shadow rounded-lg p-4 text-center">
          <h3 class="text-sm text-gray-500">Categories</h3>
          <p class="text-xl font-bold text-[#3B0A45]">12</p>
        </div>

        <div class="bg-white shadow rounded-lg p-4 text-center">
          <h3 class="text-sm text-gray-500">Orders</h3>
          <p class="text-xl font-bold text-[#3B0A45]">54</p>
        </div>

        <div class="bg-white shadow rounded-lg p-4 text-center">
          <h3 class="text-sm text-gray-500">Users</h3>
          <p class="text-xl font-bold text-[#3B0A45]">342</p>
        </div>
      </section>

      <!-- RECENT PERFUMES -->
      <section>
        <h2 class="text-lg font-semibold mb-4 text-[#3B0A45]">
          Recently Added Perfumes
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white shadow rounded-lg p-4">
            <img
              src="/images/product 8.png"
              class="w-full h-32 object-cover rounded"
            />
            <h3 class="mt-2 font-semibold text-gray-700">Amber Bloom</h3>
            <p class="text-sm text-gray-500">Stock: 24</p>
          </div>

          <div class="bg-white shadow rounded-lg p-4">
            <img
              src="/images/product 10.png"
              class="w-full h-32 object-cover rounded"
            />
            <h3 class="mt-2 font-semibold text-gray-700">Midnight Oud</h3>
            <p class="text-sm text-gray-500">Stock: 12</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goTo = (page) => {
  if (page === "dashboard") router.push("/admin/dashboard");
  if (page === "add") router.push("/admin/add-perfume");
  if (page === "manage") router.push("/admin/manage-perfumes");
};

const logout = () => {
  router.push("/admin/login");
};
</script>
