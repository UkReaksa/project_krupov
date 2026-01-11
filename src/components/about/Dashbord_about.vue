<template>
  <v-app>

    <!-- Main Navbar -->
      <navbar/>
    <!-- Main Content -->
    <v-main class="grey lighten-4">
      <v-container fluid class="py-10">
        <v-row>
          <!-- Sidebar -->
          <v-col cols="12" md="3">
            <v-card class="rounded-lg pa-4" elevation="2">
              <v-list nav dense>
                <v-subheader class="font-weight-bold text-h6">About</v-subheader>
                <v-list-item-group color="primary">
                  <v-list-item
                    v-for="item in about_us"
                    :key="item.id"
                    @click="scrollToSection(item.id)"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>

          <!-- Main Content -->
          <v-col cols="12" md="9">
            <v-card class="rounded-lg pa-6" elevation="2 main-content">
              <section>
                <h2 class="text-h4 font-weight-bold" :style="{ color: '#05204A' }">
                  About
                </h2>

                <!-- Loop through about_us items -->
                <div v-for="item in about_us" :key="item.id">
                  <h3 :id="item.id" class="text-h5 font-weight-bold mt-6">
                    {{ item.title }}
                  </h3>
                  <!-- ✅ Render HTML content properly -->
                  <p class="text-body-1 mt-2" v-html="item.description"></p>
                </div>
               
              </section>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Footer from "../footer/Footer.vue";
import navbar from "../navbar/navbar.vue";

const about_us = ref([]);


// Fetch About Us API
const fetchAboutUs = async () => {
  try {
    const response = await axios.get("https://ftrip.tech/api2/api/abouts");

    about_us.value = response.data.data;
  } catch (error) {
    console.error("Error fetching about us data:", error);
  }
};

onMounted(async () => {
  await fetchAboutUs();
});

// Navbar colors
const navColor = "#05204A";
const navColor1 = "#FFFFFF";

// Drawer state
const drawer = ref(false);

// Smooth scroll to section
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}


</script>

<style scoped>
/* ✅ Import Khmer OS Battambang font */
@import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&display=swap');

* {
  font-family: "Battambang", "Khmer OS Battambang", sans-serif;
}

.line-height-1 {
  line-height: 1;
}

.text-subtitle-2 {
  font-size: 1.1rem;
}

body {
  background-color: #f3f4f6;
  color: #333;
}

.v-card,
.v-list-item,
.v-list-group__header {
  border-radius: 8px !important;
}

.main-content h3 {
  color: #05204A;
}

.main-content p,
.main-content ul li {
  color: #4b5563;
  font-size: 1rem;
  line-height: 1.6;
}


.main-content ul {
  padding-left: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
  list-style-type: disc;
}



.main-content b {
  font-weight: 700;
  color: #05204A;
}

.main-content u {
  text-decoration: underline;
  text-decoration-color: #05204A;
  text-underline-offset: 3px;
}
</style>
