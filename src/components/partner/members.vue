<template>
  <div class="px-10">
    <h1 class="section-title">FTRIP Members</h1>
  </div>
  <br />

  <v-container class="pa-1" fluid>
    <v-card outlined class="pa-2">
      <v-card-text class="text-body-1">
        <strong>JOIN US:</strong> Membership is open to universities, research
        institutions, private companies, and associations engaged in food
        systems. Please contact us for more information via Telegram
        <a href="https://t.me/ftriptech" target="_blank">here</a>.
      </v-card-text>
    </v-card>
  </v-container>

  <v-row dense justify="space-around" align="center" mt-5>
    <!-- Loop through members -->
    <v-col v-for="item in members" :key="item.id" cols="12" sm="6" md="5">
      <v-card class="pa-3 mt-2" outlined variant="outlined">
        <v-row>
          <!-- ✅ Image -->
          <v-col cols="3" class="d-flex align-center justify-center">
            <v-img
              v-if="item.image.length"
              :src="getImageUrl(item.image[0])"
              max-width="100"
              cover
            />
            <v-icon v-else size="40" color="grey">mdi-account</v-icon>
          </v-col>

          <!-- ✅ Text Info -->
          <v-col cols="9">
            <h3 class="headline">{{ item.title }}</h3>
            <p><strong>Representative:</strong> {{ item.phone }}</p>
            <p><strong>Email:</strong> {{ item.email }}</p>
            <p><strong>Address:</strong> {{ item.address }}</p>
            <p v-if="item.partner_link">
              <strong>Website:</strong>
              <a :href="item.partner_link" target="_blank">{{
                item.partner_link
              }}</a>
            </p>
          </v-col>
        </v-row>

        <!-- ✅ Videos -->
        <!-- <v-row v-if="item.video.length" class="mt-2">
          <v-col cols="12">
            <h4 class="font-weight-medium mb-2">Videos:</h4>
            <div v-for="(vid, i) in item.video" :key="i" class="mb-2">
              <a :href="vid" target="_blank">{{ vid }}</a>
            </div>
          </v-col>
        </v-row> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const members = ref([]);

const fetchMembers = async () => {
  try {
    const response = await axios.get("https://ftrip.tech/api2/api/members");
    // ✅ API format: { status: "success", data: [...] }
    members.value = response.data.data;
  } catch (error) {
    console.error("Error fetching members:", error);
  }
};

// ✅ Get image URL from storage
function getImageUrl(path) {
  if (!path) return "/default.png"; // fallback
  return `https://ftrip.tech/storage2/${path}`;
}

onMounted(fetchMembers);
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
