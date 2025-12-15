<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-[#3B0A45] mb-6">Add New Perfume</h1>

    <div class="bg-white shadow rounded-lg p-6 max-w-2xl">
      <form @submit.prevent="onSubmit" class="space-y-5">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium mb-1">Title</label>
          <input
            v-model="title"
            type="text"
            class="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#3B0A45]"
            placeholder="Enter perfume title"
            @input="validateTitle"
          />
          <p v-if="titleError" class="text-red-500 text-sm mt-1">
            {{ titleError }}
          </p>
        </div>

        <!-- Price -->
        <div>
          <label class="block text-sm font-medium mb-1">Price (£)</label>
          <input
            v-model="price"
            type="number"
            class="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#3B0A45]"
            placeholder="Enter price"
            @input="validatePrice"
          />
          <p v-if="priceError" class="text-red-500 text-sm mt-1">
            {{ priceError }}
          </p>
        </div>

        <!-- Rating Rate -->
        <div>
          <label class="block text-sm font-medium mb-1">Rating (Rate)</label>
          <input
            v-model="ratingRate"
            type="number"
            step="0.1"
            min="0"
            max="5"
            class="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#3B0A45]"
            placeholder="Enter rating (0–5)"
            @input="validateRatingRate"
          />
          <p v-if="ratingRateError" class="text-red-500 text-sm mt-1">
            {{ ratingRateError }}
          </p>
        </div>

        <!-- Rating Count -->
        <div>
          <label class="block text-sm font-medium mb-1">Rating Count</label>
          <input
            v-model="ratingCount"
            type="number"
            min="0"
            class="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#3B0A45]"
            placeholder="Enter rating count"
            @input="validateRatingCount"
          />
          <p v-if="ratingCountError" class="text-red-500 text-sm mt-1">
            {{ ratingCountError }}
          </p>
        </div>

        <!-- Discount -->
        <div>
          <label class="block text-sm font-medium mb-1">Discount (%)</label>
          <input
            v-model="discount"
            type="number"
            min="0"
            max="100"
            class="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#3B0A45]"
            placeholder="Enter discount percentage"
            @input="validateDiscount"
          />
          <p v-if="discountError" class="text-red-500 text-sm mt-1">
            {{ discountError }}
          </p>
        </div>

        <!-- Image Upload -->
        <div>
          <label class="block text-sm font-medium mb-1">Perfume Image</label>
          <input type="file" accept="image/*" @change="handleImageUpload" />

          <div v-if="imagePreview" class="mt-3">
            <img
              :src="imagePreview"
              class="w-32 h-32 object-cover rounded shadow"
            />
          </div>

          <p v-if="imageError" class="text-red-500 text-sm mt-1">
            {{ imageError }}
          </p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-[#3B0A45] text-white py-2 rounded-md hover:bg-[#5a0f63] transition"
        >
          Add Perfume
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";

const title = ref("");
const price = ref("");
const ratingRate = ref("");
const ratingCount = ref("");
const discount = ref("");
const imageFile = ref(null);
const imagePreview = ref("");

const titleError = ref("");
const priceError = ref("");
const ratingRateError = ref("");
const ratingCountError = ref("");
const discountError = ref("");
const imageError = ref("");

// VALIDATION
const validateTitle = () => {
  titleError.value = title.value ? "" : "Title is required";
};

const validatePrice = () => {
  priceError.value = price.value > 0 ? "" : "Enter a valid price";
};

const validateRatingRate = () => {
  ratingRateError.value =
    ratingRate.value >= 0 && ratingRate.value <= 5
      ? ""
      : "Rating must be between 0 and 5";
};

const validateRatingCount = () => {
  ratingCountError.value =
    ratingCount.value >= 0 ? "" : "Rating count must be valid";
};

const validateDiscount = () => {
  discountError.value =
    discount.value >= 0 && discount.value <= 100
      ? ""
      : "Discount must be between 0 and 100";
};

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
  imageError.value = "";
};

// SUBMIT
const onSubmit = async () => {
  validateTitle();
  validatePrice();
  validateRatingRate();
  validateRatingCount();
  validateDiscount();

  if (!imageFile.value) {
    imageError.value = "Image is required";
  }

  if (
    titleError.value ||
    priceError.value ||
    ratingRateError.value ||
    ratingCountError.value ||
    discountError.value ||
    imageError.value
  ) {
    return;
  }

  try {
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("price", price.value);
    formData.append("rating_rate", ratingRate.value);
    formData.append("rating_count", ratingCount.value);
    formData.append("discount", discount.value);
    formData.append("image", imageFile.value);

    await axios.post(`${import.meta.env.VITE_API_URL}/products/`, formData);

    toast.success("Perfume added successfully");

    // Reset
    title.value = "";
    price.value = "";
    ratingRate.value = "";
    ratingCount.value = "";
    discount.value = "";
    imageFile.value = null;
    imagePreview.value = "";
  } catch (error) {
    toast.error("Failed to add perfume. Try again.");
  }
};
</script>
