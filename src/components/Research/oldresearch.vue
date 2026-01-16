<template>
  <v-main class="bg-grey-lighten-4">
    <v-container fluid class="py-10">
      <v-row justify="center">
        <v-col cols="12" md="10">
          <h2 class="text-h4 font-weight-bold mb-6" style="color: #05204A;">
<<<<<<< HEAD
            Research & Innovation
=======
            RESEARCHS
>>>>>>> 67ff534454c639a4d903f6fd15b641d349375c47
          </h2>

          <!-- 3 Cards per Row -->
          <v-row dense>
            <v-col
              v-for="item in service"
              :key="item.id"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card elevation="2" rounded="lg" class="overflow-hidden">
                
                <!-- Image -->
                <v-img
                  v-if="parseImages(item.images).length"
                  :src="storageUrl(parseImages(item.images)[0])"
                  :alt="item.title"
                  height="200"
                  cover
                ></v-img>

                <!-- Title -->
                <v-card-title class="text-h6 font-weight-bold pb-1 pt-3" style="color: #05204A;">
                  {{ item.title }}
                </v-card-title>

                <!-- Description -->
                <v-card-text>
                  <div
                    class="text-body-1 text-truncate-6"
                    v-html="makeLinksClickable(item.description)"
                  ></div>

                  <!-- See More (go to first link in description) -->
                  <v-btn
                    v-if="getFirstLink(item.description)"
                    variant="outlined"
                    size="small"
                    color="primary"
                    class="mt-2"
                    @click="openLink(getFirstLink(item.description))"
                  >
                    See More
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

        
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const service = ref([])

const fetchService = async () => {
  try {
<<<<<<< HEAD
    const response = await axios.get('https://ftrip.tech/api1/api/service-research-innovations')
=======
    const response = await axios.get('https://ftrip.tech/api2/api/service-research-innovations')
>>>>>>> 67ff534454c639a4d903f6fd15b641d349375c47
    service.value = response.data.data || []
  } catch (error) {
    console.error('Error fetching service data:', error)
  }
}

<<<<<<< HEAD
const storageUrl = (path) => `https://ftrip.tech/storage/${path}`
=======
const storageUrl = (path) => `https://ftrip.tech/storage2/${path}`
>>>>>>> 67ff534454c639a4d903f6fd15b641d349375c47

const parseImages = (images) => {
  try {
    return JSON.parse(images)
  } catch {
    return []
  }
}

// Detect and make clickable links
const makeLinksClickable = (text) => {
  if (!text) return ''
  return text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" class="text-blue-darken-2" style="text-decoration: underline;">$1</a>'
  )
}

// Extract first link (for See More button)
const getFirstLink = (text) => {
  if (!text) return null
  const match = text.match(/https?:\/\/[^\s]+/)
  return match ? match[0] : null
}

// Open link in new tab
const openLink = (url) => {
  window.open(url, '_blank')
}

onMounted(fetchService)
</script>

<style scoped>
.text-truncate-6 {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
