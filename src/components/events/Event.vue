<template>
  <v-container>
    <h1 class="text-h5 font-weight-bold mb-4">ALL PROUDUCTS</h1>

    <!-- 🔍 Search Bar -->
  <v-text-field
  v-model="searchQuery"
  label="Search by title or category"
  prepend-inner-icon="mdi-magnify"
  outlined
  variant="outlined"
  clearable
  class="mb-6 custom-search"
/>

   <v-row align="stretch">
  <v-col
    v-for="item in filteredEvents"
    :key="item.id"
    cols="12"
    sm="6"
    md="4"
    class="d-flex"
  >
    <v-card
      class="mx-auto d-flex flex-column"
      variant="outlined"
      max-width="400"
      elevation="2"
      style="flex: 1;"
    >
      <div style="position: relative;">
        <v-img
          v-if="item.images && item.images.length > 0"
          :src="getImageUrl(firstImage(item.images))"
          height="200"
          cover
          class="cursor-pointer"
          @click="openImagePreview(firstImage(item.images))"
          @error="handleImageError"
        />
        <v-img
          v-else
          src="/image/no-image.png"
          height="200"
          cover
        />

        <v-chip
          v-if="item.images && item.images.length > 1"
          color="red"
          text-color="white"
          size="small"
          class="more-images-chip"
        >
          +{{ item.images.length - 1 }}
        </v-chip>
      </div>

      <v-card-text class="flex-grow-1">
        <h3 class="text-h6 font-weight-bold">{{ item.title }}</h3>
        <p class="text-body-2 text-grey-darken-1 mb-2">
          {{ formatDate(item.created_at) }}
        </p>
        <p class="text-body-1">
          {{ truncateContent(item.content, 100) }}
          <span
            v-if="item.content && item.content.length > 100"
            @click="goToDetail(item.id)"
            style="color: #05204A; cursor: pointer; font-weight: bold;"
            class="ml-1"
          >
            Read more
          </span>
        </p>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>


    <div v-if="filteredEvents.length === 0" class="text-center py-8">
      <v-icon size="64" color="grey-lighten-1">mdi-calendar-blank</v-icon>
      <p class="text-h6 text-grey mt-4">No events found</p>
    </div>

    <!-- Image Preview Dialog -->
    <v-dialog v-model="showPreview" max-width="800px">
      <v-card>
        <v-card-title>
          <span>Image Preview</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="showPreview = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="d-flex justify-center">
          <v-img
            v-if="selectedImage"
            :src="getImageUrl(selectedImage)"
            height="400"
            contain
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const events = ref([]);
const showPreview = ref(false);
const selectedImage = ref("");
const searchQuery = ref("");

// Convert storage path to full URL
const getImageUrl = (path) => {
  if (!path) return '/image/no-image.png';
  if (path.startsWith('http')) return path;
  const cleanPath = path.replace(/^\/+/, '');
  return `https://ftrip.tech/storage2/${cleanPath}`;
};

// Handle broken image
const handleImageError = (event) => {
  event.target.src = '/image/no-image.png';
};

// Truncate text
const truncateContent = (text, length) => {
  if (!text) return "No content available";
  const cleanText = text.replace(/\r\n/g, ' ').replace(/\s+/g, ' ');
  return cleanText.length > length ? cleanText.substring(0, length) + "..." : cleanText;
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Fetch events
const fetchEvents = async () => {
  try {
    const res = await axios.get("https://ftrip.tech/api2/api/posts");
    events.value = res.data.data.map(e => ({
      ...e,
      images: e.images || [],
      categories: e.categories || [], // include categories
    }));
  } catch (err) {
    console.error("Error fetching events:", err);
  }
};

// Navigate to detail
const goToDetail = (id) => {
  router.push(`/event/${id}`);
};

// Get first image by creation time
const firstImage = (images) => {
  if (!images || images.length === 0) return null;
  const sorted = [...images].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  return sorted[0].image_url;
};

// Open image preview
const openImagePreview = (imageUrl) => {
  selectedImage.value = imageUrl;
  showPreview.value = true;
};

// 🔍 Filtered events based on search
const filteredEvents = computed(() => {
  if (!searchQuery.value) return events.value;
  const query = searchQuery.value.toLowerCase();
  return events.value.filter(e =>
    e.title.toLowerCase().includes(query) ||
    (e.categories && e.categories.some(cat => cat.name.toLowerCase().includes(query)))
  );
});

onMounted(fetchEvents);
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

/* Red overlay chip for additional images */
.more-images-chip {
  position: absolute;
  top: 8px;
  right: 8px;
  font-weight: bold;
}
</style>
