<template>
  
  <v-container class="py-10">
     <h1 class="text-h5 font-weight-bold mb-4">NEWS</h1>
    <div class="mb-6">
      <v-text-field
        v-model="searchQuery"
        label="Search News"
        append-icon="mdi-magnify"
        outlined
        dense
        hide-details
        variant="outlined"
        clearable
        @keyup.enter="searchPublications"
      ></v-text-field>
    </div>

    <div v-if="filteredPublications.length === 0" class="loading-text">
      No Publications Found
    </div>

    <v-row v-else>
      <v-col
        v-for="item in filteredPublications"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        class="d-flex"
      >
        <v-card
          outlined
          rounded
          elevation="2"
          class="d-flex flex-column"
          height="100%"
        >
          <v-img
            v-if="item.image && item.image.length > 0"
            :src="`https://ftrip.tech/storage2/${item.image[0]}`"
            height="300px"
            class="rounded-t-lg"
            cover
          ></v-img>
          <div v-else class="no-image-placeholder">No Image Available</div>

          <v-card-text>
            <h2 class="font-weight-bold mb-2">{{ item.title }}</h2>
            <!-- <p class="text-body-1 mb-4">{{ item.short_description }}</p> -->
            <p class="text-body-2 mb-2 description-truncate">
              {{ item.description }}
            </p>
          </v-card-text>

          <v-spacer></v-spacer>

          <v-card-actions class="pa-4">
            <v-btn
              v-if="item.sub_publications && item.sub_publications.length > 0"
              color="primary"
              @click="goToSubPublication(item.id)"
              variant="flat"
            >
              Read More
            </v-btn>

            <v-btn
              :href="item.short_description"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              variant="flat"
            >
              Read More
              <v-icon end>mdi-open-in-new</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const publication = ref([]);
const searchQuery = ref("");
const router = useRouter();

// Fetch all publications
const fetchPublication = async () => {
  try {
    const response = await axios.get(
      "https://ftrip.tech/api2/api/publications"
    );
    publication.value = response.data.data;
  } catch (error) {
    console.error("Error fetching publication:", error);
  }
};

onMounted(() => {
  fetchPublication();
});

// Navigate to SubPublication page
function goToSubPublication(pubId) {
  router.push({ name: "all_publication", params: { id: pubId } });
}

// Computed filtered publications based on searchQuery
const filteredPublications = computed(() => {
  if (!searchQuery.value) return publication.value;
  return publication.value.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.short_description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Optional: function for the Search button
function searchPublications() {
  console.log("Search triggered for:", searchQuery.value);
}
</script>

<style scoped>
h2 {
  font-size: 1.25rem;
  line-height: 1.3;
}
p {
  color: #555;
}
.loading-text {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}
.no-image-placeholder {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
  color: #999;
  font-weight: 500;
  text-align: center;
  border-radius: 6px 6px 0 0;
}
.description-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4em;
  max-height: 4.2em;
}
</style>
