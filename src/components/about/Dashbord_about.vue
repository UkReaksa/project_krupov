<template>
  <v-app>

    <!-- Main Navbar -->
    <navbar />

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

            <!-- 📦 Zoom animation -->
            <transition name="zoom" appear>
              <div class="rounded-lg pa-6 main-content" elevation="2">
                <section>

                  <!-- ✨ Typing title -->
                  <h2 class="text-h4 font-weight-bold typing-text" :style="{ color: '#05204A' }">
                    {{ typedText }}
                  </h2>

                  <!-- ⬅️ Slide left / right sections -->
                  <div
                    v-for="(item, index) in about_us"
                    :key="item.id"
                    :id="item.id"
                    :class="index % 2 === 0 ? 'slide-left' : 'slide-right'"
                    :style="{ animationDelay: (index * 0.2) + 's' }"
                  >
                    <h3 class="text-h5 font-weight-bold mt-6">
                      {{ item.title }}
                    </h3>
                    <p class="text-body-1 mt-2" v-html="item.description"></p>
                  </div>

                </section>
              </div>
            </transition>

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

/* ======================
   ✨ Typing effect
====================== */
const fullText = "About";
const typedText = ref("");
let index = 0;

function typeEffect() {
  if (index < fullText.length) {
    typedText.value += fullText.charAt(index);
    index++;
    setTimeout(typeEffect, 120);
  }
}

/* ======================
   API Fetch
====================== */
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
  typeEffect();
});

/* ======================
   Scroll function
====================== */
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<style scoped>
/* Khmer font */
@import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&display=swap');

* {
  font-family: "Battambang", "Khmer OS Battambang", sans-serif;
}

/* ======================
   📦 Zoom animation
====================== */
.zoom-enter-active {
  transition: all 0.6s ease;
}

.zoom-enter-from {
  opacity: 0;
  transform: scale(0.85);
}

.zoom-enter-to {
  opacity: 1;
  transform: scale(1);
}

/* ======================
   ⬅️ Slide animations
====================== */
.slide-left,
.slide-right {
  opacity: 0;
  animation: slideIn 0.8s ease forwards;
}

.slide-left {
  transform: translateX(-40px);
}

.slide-right {
  transform: translateX(40px);
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ======================
   Main styles
====================== */
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
