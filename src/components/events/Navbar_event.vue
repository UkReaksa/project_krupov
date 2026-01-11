<template>
  <v-app>
    <!-- navbar -->
      <navbar/>
    <!-- main -->
    <v-main class="mt-2">
      <Banners/>
      <!-- dashbord -->
      <div class="mt-5">
        <Dashbord />
      </div>
      
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import Dashbord from "./Dashbord_home.vue";
import Banners from "../banner/Banners.vue";
import navbar from "../navbar/navbar.vue";
// Colors
const navColor = "#05204A";
const navColor1 = "#FFFFFF";



// Drawer state
const drawer = ref(false);
</script>

<style scoped>
.line-height-1 {
  line-height: 1;
}

.text-subtitle-2 {
  font-size: 1.1rem; /* Adjusted size */
}
</style>
