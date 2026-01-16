<template>
  <div class=" px-5 py-2">
    <v-skeleton-loader
      v-if="loading"
      type="image"
      height="400"
    />

    <v-carousel
      v-else
      cycle
      hide-delimiter-background
      height="400"
    >
      <v-carousel-item
        v-for="(image, index) in allImages"
        :key="index"
        :src="getImageUrl(image)"
        cover
      />
    </v-carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const allImages = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
<<<<<<< HEAD
    const response = await axios.get("https://ftrip.tech/api1/api/banners");
=======
    const response = await axios.get("https://ftrip.tech/api2/api/banners");
>>>>>>> 67ff534454c639a4d903f6fd15b641d349375c47
    // Assuming your API returns an array of objects, each with an "images" array
    allImages.value = response.data.data.flatMap(item => item.images);
  } catch (error) {
    console.error("Error fetching banners:", error);
  } finally {
    loading.value = false;
  }
});

// ✅ Corrected URL (no /api1/)
const getImageUrl = (path) => {
  if (!path) return '/image/no-image.png';
  // Make sure 'path' already includes 'banners/' part if needed
<<<<<<< HEAD
  return `https://ftrip.tech/storage/${path}`;
=======
  return `https://ftrip.tech/storage2/${path}`;
>>>>>>> 67ff534454c639a4d903f6fd15b641d349375c47
};
</script>
