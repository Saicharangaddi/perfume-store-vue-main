<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-[#3B0A45] mb-6">Manage Perfumes</h1>

    <!-- Perfumes Grid -->
    <div
      v-if="perfumes.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="perfume in perfumes"
        :key="perfume.id"
        class="bg-white shadow rounded-lg p-4"
      >
        <!-- Image -->
        <img
          :src="perfume.image"
          alt="Perfume"
          class="w-full h-40 object-cover rounded"
        />

        <!-- Title -->
        <h3 class="mt-3 font-semibold text-gray-800">{{ perfume.title }}</h3>

        <!-- Price -->
        <p class="text-sm text-gray-600">£{{ perfume.price }}</p>

        <!-- Rating -->
        <p class="text-sm text-gray-600">
          ⭐ {{ perfume.rating_rate }} ({{ perfume.rating_count }} reviews)
        </p>

        <!-- Discount -->
        <p v-if="perfume.discount > 0" class="text-pink-600 font-medium">
          -{{ perfume.discount }}%
        </p>

        <!-- Buttons -->
        <div class="flex justify-between mt-4">
          <button
            @click="editPerfume(perfume.id)"
            class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>

          <button
            @click="deletePerfume(perfume.id)"
            class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- No Perfumes -->
    <p v-else class="text-gray-600 text-center mt-10">
      No perfumes found. Add some products first.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const perfumes = ref([]);
const router = useRouter();

// Fetch perfumes from Django
const fetchPerfumes = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/`
    );
    perfumes.value = response.data;
  } catch (error) {
    toast.error("Failed to load perfumes");
  }
};

// Delete perfume
const deletePerfume = async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}/`);
    perfumes.value = perfumes.value.filter((p) => p.id !== id);
    toast.success("Perfume deleted");
  } catch (error) {
    toast.error("Failed to delete perfume");
  }
};

// Edit perfume
const editPerfume = (id) => {
  router.push(`/admin/edit-perfume/${id}`);
};

onMounted(() => {
  fetchPerfumes();
});
</script>
