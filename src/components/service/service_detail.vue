<template>
  <v-app>
    <!-- Navbar -->
    <navbar/>

    <v-main class="my-10" v-if="service">
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col cols="12" lg="10" xl="8">
            <!-- Header Section -->
            <div class="text-center mb-8">
              <h1 class="text-h3 font-weight-bold mb-4 text-primary">
                {{ service.title }}
              </h1>

              <div class="d-flex align-center justify-center flex-wrap text-grey-darken-1 mb-6">
                <div v-if="service.author" class="d-flex align-center mr-6 mb-2">
                  <v-icon size="small" class="mr-2">mdi-account-circle-outline</v-icon>
                  <span class="text-caption font-weight-bold">{{ service.author.name }}</span>
                </div>

                <div v-if="service.published_date" class="d-flex align-center mr-6 mb-2">
                  <v-icon size="small" class="mr-2">mdi-calendar-blank-outline</v-icon>
                  <span class="text-caption font-weight-bold">{{ formatDate(service.published_date) }}</span>
                </div>

                <div v-if="service.category" class="d-flex align-center mb-2">
                  <v-icon size="small" class="mr-2">mdi-tag-outline</v-icon>
                  <v-chip size="small" :color="navColor" variant="flat" label>{{ service.category.name }}</v-chip>
                </div>
              </div>
            </div>

            <!-- Featured Image Carousel -->
            <v-card elevation="4" rounded="lg" class="overflow-hidden mb-8">
              <v-carousel cycle hide-delimiter-background height="500">
                <v-carousel-item
                  v-for="(img, idx) in service.image"
                  :key="idx"
                >
                  <v-img
         :src="`https://ftrip.tech/storage2/${img}`"

                    cover
                    height="500"
                  />
                </v-carousel-item>
              </v-carousel>
            </v-card>

            <!-- Content with Embedded Images and clickable links -->
            <div class="description-box text-body-1 leading-relaxed">
              <template v-for="(block, index) in descriptionBlocks" :key="index">
                <!-- Text Block -->
                <p v-if="block.type === 'text'" class="mb-4" v-html="block.content"></p>
                
                <!-- Image Block -->
                <ImageCard
                  v-else-if="block.type === 'image'"
                  :src="block.src"
                  :alt="block.alt"
                  :caption="block.caption"
                  class="my-8"
                />
              </template>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <div v-else class="text-center my-10">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Footer from "../footer/Footer.vue";
import navbar from "../navbar/navbar.vue";

// Define ImageCard component
const ImageCard = {
  props: { src: String, alt: String, caption: String },
  template: `
    <v-card class="image-card" elevation="2" rounded="lg">
      <v-img :src="src" :alt="alt" cover height="auto" max-height="400" class="align-end" />
      <v-card-text v-if="caption" class="text-center text-caption font-italic text-medium-emphasis py-2 px-4">
        {{ caption }}
      </v-card-text>
    </v-card>
  `,
  name: 'ImageCard'
};

const route = useRoute();
const service = ref(null);
const navColor = "#05204A";

const fetchServiceById = async () => {
  try {
    const id = route.params.id;

    const response = await axios.get(`https://ftrip.tech/api2/api/services/${id}`);

    service.value = response.data.data;
  } catch (error) {
    console.error("Error fetching service detail:", error);
  }
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

// Convert URLs in text to clickable links
const makeLinksClickable = (text) => {
  if (!text) return '';
  return text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:#1976D2; text-decoration:underline;">$1</a>'
  );
};

// Parse description into blocks (text/images) and make links clickable
const descriptionBlocks = computed(() => {
  if (!service.value || !service.value.description) return [];
  
  const blocks = [];
  const parts = service.value.description.split(/(\{\{img:.*?\}\})/g);

  parts.forEach(part => {
    if (part.startsWith('{{img:') && part.endsWith('}}')) {
      const imgContent = part.slice(6, -2); // remove {{img: and }}
      const [src, ...captionParts] = imgContent.split('|');
      blocks.push({
        type: 'image',

        src: src.trim().startsWith('http') ? src.trim() : `https://ftrip.tech/storage2/${src.trim()}`,

        alt: captionParts.join('|').trim() || 'Service Image',
        caption: captionParts.join('|').trim()
      });
    } else if (part.trim() !== '') {
      part.split('\n').filter(p => p.trim() !== '').forEach(p => {
        blocks.push({
          type: 'text',
          content: makeLinksClickable(p.trim())
        });
      });
    }
  });

  return blocks;
});

onMounted(fetchServiceById);
</script>

<style scoped>
.leading-relaxed { line-height: 1.8; }

.description-box {
  background: #f9fafb;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.text-primary { color: #05204a; }

.image-card {
  max-width: 100%;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
}

.description-box a {
  color: #1976D2;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .description-box { padding: 20px; }
  .text-h3 { font-size: 1.75rem !important; }
}
</style>
