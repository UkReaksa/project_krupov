<template>
  <v-container>
    <h1 class="text-h5 font-weight-bold mb-4">All Events</h1>

    <v-row align="stretch"> <!-- ✅ This makes all columns stretch evenly -->
      <v-col

        v-for="item in events.slice(0, 15)"

        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        class="d-flex"
      >
        <v-card
          class="d-flex flex-column w-100"
          variant="outlined"
          elevation="2"
          style="flex: 1;"
        >
          <!-- Image -->
          <v-img
            v-if="item.images && item.images.length > 0"
            :src="getImageUrl(item.images[0].image_url)"
            height="200"
            cover
            @error="handleImageError"
          />
          <v-img
            v-else
            src="/image/no-image.png"
            height="200"
            cover
          />

          <v-card-text class="flex-grow-1 d-flex flex-column justify-between">
            <div>
              <h3 class="text-h6 font-weight-bold">{{ item.title }}</h3>
              <p class="text-body-2 text-grey-darken-1 mb-2">
                {{ formatDate(item.created_at) }}
              </p>
              <p class="text-body-1" v-html="truncateContent(item.content, 100)"></p>
            </div>

            <span
              v-if="item.content && item.content.length > 100"
              @click="goToDetail(item.id)"
              style="color: #05204A; cursor: pointer; font-weight: bold;"
              class="mt-auto"
            >
              Read more
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div v-if="events.length === 0" class="text-center py-8">
      <v-icon size="64" color="grey-lighten-1">mdi-calendar-blank</v-icon>
      <p class="text-h6 text-grey mt-4">No events found</p>
    </div>
  </v-container>
</template>


<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { marked } from "marked"; // ✅ Markdown parser

const router = useRouter();
const events = ref([]);

// Convert image path to full URL
const getImageUrl = (path) => {
  if (!path) return "/image/no-image.png";
  if (path.startsWith("http")) return path;
  const cleanPath = path.replace(/^\/+/, "");


  return `https://ftrip.tech/storage2/${cleanPath}`;

};

// Handle broken image
const handleImageError = (event) => {
  event.target.src = "/image/no-image.png";
};

// Truncate + render markdown
const truncateContent = (text, length) => {
  if (!text) return "No content available";
  const cleanText = text.replace(/\r\n/g, " ").replace(/\s+/g, " ");
  const truncated =
    cleanText.length > length
      ? cleanText.substring(0, length) + "..."
      : cleanText;
  // ✅ Convert Markdown (**bold**) to HTML
  return marked.parse(truncated);
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Fetch events from API
const fetchEvents = async () => {
  try {

    const res = await axios.get("https://ftrip.tech/api2/api/posts");

    events.value = res.data.data.map((e) => ({
      ...e,
      images: e.images || [],
    }));
  } catch (err) {
    console.error("Error fetching events:", err);
  }
};

// Navigate to detail page
const goToDetail = (id) => {
  router.push(`/event/${id}`);
};

onMounted(fetchEvents);
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
