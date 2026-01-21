<template>
  <v-app>
    <!-- Top App Bar (color bar only) -->
    <navbar/>
    <!--  -->
    <v-main class="my-5" v-if="partners">
      <v-card elevation="2" rounded="lg" class="pa-6">
        <h1 class="text-h5 font-weight-bold mb-2">
          {{ partners.title }}
        </h1>

        <v-card>
          <div class="carousel-wrapper">
            <v-carousel cycle hide-delimiter-background height="400">
              <!-- Image -->
              <v-carousel-item v-if="partners.image">
                <v-img :src="partners.image" cover height="400" />
              </v-carousel-item>

              <!-- Video -->
              <v-carousel-item v-if="partners.video">
                <video
                  controls
                  style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;"
                >
                  <source :src="partners.video" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-card>
      </v-card>
      <br />
      <p>{{ partners.partner_description }}</p>
    </v-main>

    <div v-else class="text-center my-10">
      <v-progress-circular indeterminate color="primary" />
    </div>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import navbar from "../navbar/navbar.vue";

const route = useRoute();
const partners = ref(null);
const index = ref(0); // Default to 0
const drawer = ref(false); // Mobile menu state

const fetchPartners = async () => {
  try {

    const response = await axios.get('https://ftrip.tech/api2/api/partners');

    index.value = parseInt(route.params.index) || 0; // If no param, default to 0
    partners.value = response.data[index.value];
  } catch (error) {
    console.error('Error fetching partners:', error);
  }
};

onMounted(fetchPartners);

const navColor = '#05204A';
const navColor1 = '#FFFFFF';
</script>
