<template>
  <v-container>
    <h1 class="text-h5 font-weight-bold mb-4">SERVICES</h1>

    <v-row>
      <v-col
        v-for="item in services"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
      >
        <div
          class="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white px-2 "
          @click="goToDetail(item.id)"
        >
          <!-- Image -->
          <v-img
            v-if="item.image && item.image.length"
            :src="`https://ftrip.tech/storage2/${item.image[0]}`"
             height="200px"
          
            cover
            class="rounded-t-lg"
          />

          <!-- Content -->
          <div class="p-4">
           
             <div class="text-sm font-semibold mb-2 line-clamp-3" v-html="item.title"></div>

             <div class="text-sm text-gray-600 line-clamp-3" v-html="item.description"></div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const services = ref([]);

const fetchServices = async () => {
  try {
    const response = await axios.get("https://ftrip.tech/api2/api/services");
    services.value = response.data.data;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
};

onMounted(fetchServices);

const goToDetail = (id) => {
  router.push(`/service/${id}`);
};
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
