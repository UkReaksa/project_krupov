<template>
  <v-app>
    <!-- Top Navbar -->
    <navbar />

    <!-- Banner Section -->
    <v-main class="mt-2">
      <div class="carousel-wrapper">
        <Banners />
      </div>
    </v-main>

    <v-main>
      <!-- Partner Section -->
      <div class="mt-1">
        <Partner_team />
      </div>

      <!-- 🔥 Display Events Section -->
      <div class="my-6 ml-14">
     
          <v-col

            cols="12"
            
            v-for="event in events"
            :key="event.id"
            class="mx-auto"
          >
              <div
                v-html="event.text"
                class="text-body-1 event-content"
              ></div>
          
          </v-col>
      
      </div>

      <!-- Members Section -->
      <div class="mt-1">
        <Members />
      </div>
    </v-main>

    <!-- Footer -->
    <div class="mt-5">
      <Footer />
    </div>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Partner_team from "./Partner_team.vue";
import Members from "./members.vue";
import Footer from "../footer/Footer.vue";
import Banners from "../banner/Banners.vue";
import navbar from "../navbar/navbar.vue";

const events = ref([]);

const fetchEvents = async () => {
  try {
    const res = await axios.get("https://ftrip.tech/api2/api/events");

    events.value = res.data;
  } catch (e) {
    console.error("Failed to fetch events", e);
  }
};

onMounted(fetchEvents);
</script>

<style scoped>
/* Make sure event text shows correctly (with line breaks, bold, etc.) */
.event-content {
  white-space: pre-line; /* keeps line breaks from textarea */
  line-height: 1.6;
  color: #333;
}

/* Optional styling for formatted text */
.event-content b {
  font-weight: bold;
}
.event-content i {
  font-style: italic;
}
.event-content u {
  text-decoration: underline;
}

/* Smooth hover effect for cards */
.v-card {
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}
.v-card:hover {
  transform: translateY(-3px);
}

/* Layout styling */
.carousel-wrapper {
  position: relative;
}
</style>
