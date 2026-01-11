<template>
  <v-container>
    <h1 class="text-h5 font-weight-bold mb-4">Expertise</h1>

    <v-row>
      <v-col
        v-for="item in services"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
      >
        <div
          class="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white px-5 py-5"
          @click="goToDetail(item.id)"
        >
          <!-- 🖼️ Image -->
          <v-img
            v-if="item.image && item.image.length"
            :src="`https://ftrip.tech/storage/${item.image[0]}`"
            height="300px"
            cover
            class="rounded-t-lg"
          />

          <!-- 📄 Content -->
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-2 line-clamp-1">
              {{ item.title }}
            </h3>
            <p class="text-body-2 text-grey-darken-1 mb-2">
              {{ formatDate(item.created_at) }}
            </p>
            <!-- 📝 Description -->
            <div
              class="description-content text-gray-800 mb-4 line-clamp-3"
              v-html="item.description"
            ></div>
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
    const response = await axios.get("https://ftrip.tech/api1/api/expertises");
    services.value = response.data.data;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
};
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
onMounted(fetchServices);

const goToDetail = (id) => {
  router.push(`/expertise_detail/${id}`);
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

/* 🧠 Make description look better */
.description-content {
  font-size: 1rem; /* = 16px */
  line-height: 1.6;
  font-weight: 400;
  color: #333;
}

/* Optional: make inner HTML (h1-h6, p, span) also nice */
.description-content h1 {
  font-size: 1.6rem;
  font-weight: 700;
}
.description-content h2 {
  font-size: 1.4rem;
  font-weight: 600;
}
.description-content h3 {
  font-size: 1.2rem;
  font-weight: 500;
}
.description-content p,
.description-content span {
  font-size: 1rem;
}
</style>
