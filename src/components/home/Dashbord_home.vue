<template>
  <v-app>
    <!-- navbar -->
      <navbar/>

    <v-main class="mt-2">
      <!-- banner -->
      <Banners />
      <!-- Dashboard -->
      <div class="mt-4">
        <Dashbord />
      </div>

      <!-- About new info -->
      
      <div
        class="ml-6 cursor-pointer d-flex justify-end mr-6"
      >
        <v-btn
          to="/events"
          variant="outlined"
          color="indigo"
          text
        >All</v-btn>
      </div>
     
        <div class="mt-1">
          <New_infomation />
        </div>
        <!-- <div class="text-center">
          <h1>FTRIP Highlights</h1>
        </div>
        <div >
          <Ftrip_highlights />
        </div> -->
   
 </v-main>
    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import Dashbord from "./main_home.vue";
import New_infomation from "./New_infomation.vue";
import Ftrip_highlights from "./Ftrip_highlights.vue";
import Footer from "../footer/Footer.vue";
import Banners from "../banner/Banners.vue";
import axios from "axios";
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
  font-size: 1.1rem;
}

</style>
