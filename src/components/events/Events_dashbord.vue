<template>
  <v-app>
   <!-- navbar -->
    <navbar/>
    <!-- Main Content -->
    <v-main class="grey lighten-4">
      <div  >
        <Dashbord />
         </div>
      <div class="mt-1">
        <Events />
      </div>
    </v-main>  
    <!-- Footer -->
    <Footer />
  
  </v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

// import Dashbord from "../home/main_home.vue";

import Events from "./Event.vue"; 
import Footer from "../footer/Footer.vue";
import navbar from "../navbar/navbar.vue";
// Colors
const navColor = "#05204A";
const navColor1 = "#FFFFFF";

// State
const events = ref([]);
const drawer = ref(false);
const showModal = ref(false);
const selectedEvent = ref(null);

// Navigation links

</script>

<style scoped>
.line-height-1 {
  line-height: 1;
}

.text-subtitle-2 {
  font-size: 1.1rem;
}

body {
  font-family: "Inter", sans-serif;
  background-color: #f3f4f6;
  color: #333;
}

.v-card {
  border-radius: 12px !important;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.v-card-title {
  color: #05204A;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 12px;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0;
}
</style>
