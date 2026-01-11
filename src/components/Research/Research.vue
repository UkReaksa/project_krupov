<template>
  <v-main class="grey lighten-4">
    <v-container fluid class="py-10">
      <v-row justify="center">
        <v-col cols="12" md="9">
          <v-card class="rounded-lg pa-6" elevation="0" style="background-color: transparent;">
            <h2 class="text-h4 font-weight-bold mb-6" style="color: #05204A;">
              Research & Innovation
            </h2>

            <!-- Services Grid -->
            <v-row>
              <v-col
                v-for="item in services"
                :key="item.id"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card class="mx-auto" max-width="400" elevation="3" @click="goToDetail(item.id)">
                  <v-img
                    v-if="item.image && item.image.length"
                    :src="`https://ftrip.tech/storage2/${item.image[0]}`"
                    height="180px"
                    cover
                    class="rounded-t-lg"
                  />
                  <v-card-title class="text-h6 font-weight-bold">{{ item.title }}</v-card-title>
                  <v-card-subtitle class="text-caption">{{ item.description }}</v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>

            <!-- Sidebar + Content Section -->
            <v-row class="mt-10">
              <!-- Left Sidebar -->
              <v-col cols="12" md="3" class="pa-4">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-title>
                      <v-icon class="mr-2">mdi-chevron-right</v-icon>
                      Thematic Areas
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <v-icon class="mr-2" color="primary">mdi-square</v-icon>
                      Key Initiatives
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-col>

              <!-- Right Content -->
              <v-col cols="12" md="9" class="pa-4">
                <!-- Thematic Areas -->
                <div class="mb-8">
                  <h3 class="text-h5 font-weight-bold mb-4">Thematic Areas</h3>
                  <v-row>
                    <v-col cols="12" md="6">
                      <ul>
                        <li>Food safety and quality assurance</li>
                        <li>Postharvest handling and storage</li>
                        <li>Food processing and value addition</li>
                        <li>Packaging innovation</li>
                        <li>Nutrition and sustainable diets</li>
                        <li>Climate-smart food technologies</li>
                      </ul>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-img src="/image1.jpg" aspect-ratio="16/9" class="mb-3 rounded"></v-img>
                      <v-img src="/image2.jpg" aspect-ratio="16/9" class="mb-3 rounded"></v-img>
                      <v-img src="/image3.jpg" aspect-ratio="16/9" class="mb-3 rounded"></v-img>
                    </v-col>
                  </v-row>
                </div>

                <!-- Key Initiatives -->
                <div>
                  <h3 class="text-h5 font-weight-bold mb-4">Key Initiatives</h3>
                  <v-row>
                    <v-col cols="12" md="6">
                      <ul>
                        <li>Food safety and quality assurance</li>
                        <li>Postharvest handling and storage</li>
                        <li>Food processing and value addition</li>
                        <li>Packaging innovation</li>
                        <li>Nutrition and sustainable diets</li>
                        <li>Climate-smart food technologies</li>
                      </ul>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-img src="/image1.jpg" aspect-ratio="16/9" class="mb-3 rounded"></v-img>
                      <v-img src="/image2.jpg" aspect-ratio="16/9" class="mb-3 rounded"></v-img>
                      <v-img src="/image3.jpg" aspect-ratio="16/9" class="mb-3 rounded"></v-img>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const services = ref([]);

// Fetch services from API
const fetchServices = async () => {
  try {
    const response = await axios.get("https://ftrip.tech/api2/api/service-research-innovations");
    services.value = response.data.data;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
};

onMounted(fetchServices);

const goToDetail = (id) => {
  router.push(`/research/${id}`);
};
</script>

<style scoped>
ul {
  padding-left: 1rem;
}
li {
  margin-bottom: 0.5rem;
}
.rounded-t-lg {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
</style>
