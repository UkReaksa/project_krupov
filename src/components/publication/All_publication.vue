<template>
    <v-app>
    <!-- navbar -->
      <navbar/> 

    <v-main>
           <v-container class="py-10">
    <div v-if="loading" class="loading-text">
      Loading SubPublications...
    </div>

    <div v-else-if="publication">
      <h2 class="font-weight-bold mb-4">{{ publication.title }}</h2>
      <p class="text-body-1 mb-2">{{ publication.short_description }}</p>
      <p class="text-body-2 mb-4">{{ publication.description }}</p>

      <h4 v-if="publication.sub_publications && publication.sub_publications.length > 0" class="mb-4">
        SubPublications
      </h4>

      <v-row>
        <v-col
          v-for="(sub, index) in publication.sub_publications"
          :key="index"
          cols="12"
          sm="6"
        >
          <v-card class="pa-3 mb-3" outlined>
            <h5 class="mb-1">{{ sub.title }}</h5>
            <p class="text-body-2 mb-2">{{ sub.description }}</p>

            <v-row v-if="sub.images && sub.images.length > 0" dense>
              <v-col
                v-for="(img, imgIndex) in sub.images"
                :key="imgIndex"
                cols="6"
              >
                <v-img
                  :src="`https://ftrip.tech/storage2/${img}`"
                  height="100"
                  class="rounded"
                  cover
                ></v-img>
              </v-col>
            </v-row>

            <div v-else class="no-image-placeholder-sub text-center">
              No SubPublication Image
            </div>
          </v-card>
        </v-col>
      </v-row>

    </div>

    <div v-else class="loading-text">
      Publication not found.
    </div>
  </v-container>
    </v-main>
 

    <Footer/>
    </v-app>

</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import Footer from "../footer/Footer.vue";
import navbar from "../navbar/navbar.vue";
const route = useRoute();
const publication = ref(null);
const loading = ref(true);

const fetchPublicationById = async () => {
  try {
    const id = route.params.id; // get the id from route
    const res = await axios.get(`https://ftrip.tech/api2/api/publications/${id}`);
    publication.value = res.data.data; // assuming API returns {data: {...}}
  } catch (error) {
    console.error("Error fetching publication:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPublicationById();
});
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
}
h4 {
  font-size: 1.2rem;
}
h5 {
  font-size: 1rem;
}
p {
  color: #555;
}
.loading-text {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}
.no-image-placeholder-sub {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
  color: #999;
  font-weight: 500;
  text-align: center;
  border-radius: 6px;
}
</style>
