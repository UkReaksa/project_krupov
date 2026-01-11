<template>
  <v-app>
    <!-- Top Navbar -->
      <navbar/>
      <!--  -->
      <v-main class="mt-2">
  <div class="carousel-wrapper">
    <!-- banner -->
    <Banners />
    <!-- Overlay text -->
  </div>
</v-main>
    

    <!-- Mobile Drawer -->
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list dense>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          :to="link.to"
          link
          @click="drawer = false"
        >
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main class="grey lighten-4">
      <div>
        <Dashbord />
      </div>
      <div class="mt-1">
        <publication /> 
      </div>

    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import publication from "./publication.vue";
import Footer from "../footer/Footer.vue";
import Banners from "../banner/Banners.vue";
import navbar from "../navbar/navbar.vue";

// Colors
const navColor = "#05204A";
const navColor1 = "#FFFFFF";

// Mobile drawer state
const drawer = ref(false);

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