<template>
  <div class="px-10">
    <h1 class="section-title">FTRIP Founders</h1>
  </div>
  <br />

  <v-row dense justify="space-around" align="center" mt-5>
    <!-- Loop through partners -->
    <v-col
      v-for="(item, index) in partners"
      :key="item.id"
      cols="12"
      sm="6"
      md="5"
    >
      <v-card
        class="pa-3"
        outlined
        variant="outlined"
        @click="goToDetail(item.id)"
        style="cursor: pointer;"
      >
        <v-row>
          <v-col cols="3" class="d-flex align-center justify-center">
            <!-- ✅ Show first image from storage -->
            <v-img
              v-if="item.image.length"
              :src="getImageUrl(item.image[0])"
              max-width="100"
              cover
            />
          </v-col>
          <v-col cols="9">
            <h3 class="headline">{{ item.title }}</h3>
            <p><strong>Representative:</strong> {{ item.phone }}</p>
            <p><strong>Email:</strong> {{ item.email }}</p>
            <p><strong>Address:</strong> {{ item.address }}</p>
            <p>
              <strong>Website:</strong>
              <a :href="item.partner_link" target="_blank">{{ item.partner_link }}</a>
            </p>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const partners = ref([]);
const router = useRouter();

const fetchPartners = async () => {
  try {
    const response = await axios.get("https://ftrip.tech/api2/api/partners");
    // ✅ API has structure { status: "success", data: [...] }
    partners.value = response.data.data;
  } catch (error) {
    console.error("Error fetching partners:", error);
  }
};

// ✅ Fix image path from storage
function getImageUrl(path) {
  if (!path) return "/default.png"; // fallback if no image
  return `https://ftrip.tech/storage2/${path}`;
}

onMounted(fetchPartners);

function goToDetail(id) {
  router.push(`/partner/${id}`);
}
</script>

<style scoped>
.v-card {
  border-radius: 12px;
}
a {
  color: #1976d2;
  text-decoration: none;
}

</style>
