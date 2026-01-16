<template>
  <!-- Drawer -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list dense>
      <v-list-item v-for="link in links" :key="link.text" :to="link.to" link>
        <v-list-item-title>{{ link.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- App Bar -->
  <v-app-bar :color="navColor1" flat class="elevation-2 rounded pt-1">
    <!-- Left Logo + Title -->
    <div class="d-flex align-center ml-4">
      <v-img
<<<<<<< HEAD
        src="/image/ftrip.png"
        alt="FTRIP Logo"
=======
        src="/image/agrobio4cam.png"
        alt="Agrobio4Cam Logo"
>>>>>>> 67ff534454c639a4d903f6fd15b641d349375c47
        class="mr-2 rounded"
        contain
        width="50"
        height="50"
      />
      <div class="d-flex flex-column">
        <span class="text-subtitle-2 font-weight-bold line-height-1">
<<<<<<< HEAD
          FOOD TECHNOLOGY,
        </span>
        <span class="text-subtitle-2 font-weight-bold line-height-1">
          RESEARCH & INNOVATION PLATFORM
=======
          អាហ្រ្គូបាយអូហ្វ័រខេម  
        </span>
        <span class="text-subtitle-2 font-weight-bold line-height-1">
          AgroBio4cam
>>>>>>> 67ff534454c639a4d903f6fd15b641d349375c47
        </span>
      </div>
    </div>

    <v-spacer />

    <!-- Desktop Menu -->
    <div class="d-none d-md-flex">
      <v-btn
        v-for="link in links"
        :key="link.text"
        :to="link.to"
        variant="text"
      >
        {{ link.text }}
      </v-btn>
    </div>

    <!-- Mobile Toggle -->
    <v-app-bar-nav-icon class="d-md-none mr-4" @click.stop="drawer = !drawer" />

    <!-- Partner Logos (Animated Loop) -->
    <div class="logo-slider d-none d-sm-flex align-center mr-4">
      <div class="slider-track">
        <v-img
          v-for="(logo, index) in [...logos, ...logos]" 
          :key="index"
          :src="logo.src"
          :alt="logo.alt"
          class="rounded mx-2"
          contain
          width="50"
          height="50"
        />
      </div>
    </div>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";

const navColor = "#05204A";
const navColor1 = "#FFFFFF";

const drawer = ref(false);

const links = [
  { text: "Home", to: "/" },
<<<<<<< HEAD
  { text: "Partners", to: "/partner" },
  { text: "Expertise", to: "/expertise_dashbord" },
  { text: "Services", to: "/dashbord_service" },
  { text: "Research", to: "/dadhbord_research" },
  { text: "Events", to: "/events" },
  { text: "Publications", to: "/dadhbord_publication" },
=======
  { text: "Products", to: "/events" },
  // { text: "Partners", to: "/partner" },
  { text: "News", to: "/dadhbord_publication" },
  // { text: "Expertise", to: "/expertise_dashbord" },
  { text: "Services", to: "/dashbord_service" },
  { text: "Research", to: "/dadhbord_research" },
>>>>>>> 67ff534454c639a4d903f6fd15b641d349375c47
  { text: "About", to: "/dashbord_about" },
];

const logos = [
  { src: "/image/1.png", alt: "Partner 1" },
  { src: "/image/2.png", alt: "Partner 2" },
  { src: "/image/3.png", alt: "Partner 3" },
];
</script>

<style scoped>
.line-height-1 {
  line-height: 1;
}
.text-subtitle-2 {
  font-size: 1.1rem;
}

/* Partner logo slider animation */
.logo-slider {
  overflow: hidden;
  width: 180px; /* Adjust depending on logo count and size */
  position: relative;
}

.slider-track {
  display: flex;
  animation: scroll 6s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
