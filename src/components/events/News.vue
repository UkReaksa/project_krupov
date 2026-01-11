<template>
  <v-app>
    <navbar />

    <v-main class="main-background">
      <v-container class="main-content-frame pa-4 pa-md-6 my-5">
        <!-- Back Button -->
        <v-btn class="mb-6" @click="goBack">
          <v-icon left>mdi-arrow-left</v-icon>
          Back to All Posts
        </v-btn>

        <v-row>
          <!-- LEFT COLUMN: MAIN CONTENT -->
          <v-col cols="12" md="8">
            <v-card v-if="post" elevation="0" rounded class="pa-6 custom-post-card">
              <h2 class="text-h4 font-weight-bold mb-4">{{ post.title }}</h2>

              <!-- Render sanitized Markdown content with clickable links -->
              <div v-html="sanitizedContent" class="mb-8 text-body-1 post-content"></div>

              <!-- Images -->
              <div v-if="post.images && post.images.length" class="mb-8">
                <h3 class="text-h6 mb-4 font-weight-medium">🖼️ Attached Images</h3>
                <v-row dense>
                  <v-col
                    v-for="img in post.images"
                    :key="img.id"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-img
                      :src="storageUrl(img.image_url)"
                      height="200"
                      class="rounded-sm mb-2 clean-image"
                      cover
                    ></v-img>
                  </v-col>
                </v-row>
              </div>
            </v-card>

            <!-- Loader / empty state -->
            <div v-else class="text-center my-10">
              <v-progress-circular indeterminate color="primary" size="64" width="6" />
              <p class="mt-4 text-h6 text-medium-emphasis">Loading post...</p>
            </div>
          </v-col>

          <!-- RIGHT COLUMN: SIDEBAR -->
          <v-col cols="12" md="4">
            <v-card elevation="2" rounded="lg" class="mb-6">
              <v-card-title class="text-h6 font-weight-medium">
                Videos
              </v-card-title>

              <v-card-text>
                <v-row v-if="post && post.videos && post.videos.length" dense>
                  <v-col
                    v-for="vid in post.videos"
                    :key="vid.id"
                    cols="12"
                    sm="6"
                    md="12"
                  >
                    <v-responsive aspect-ratio="16/9" class="rounded-lg overflow-hidden">
                      <!-- YouTube Video -->
                      <template v-if="getYouTubeEmbedUrl(vid.video_url)">
                        <iframe
                          :src="getYouTubeEmbedUrl(vid.video_url)"
                          frameborder="0"
                          allowfullscreen
                          style="width: 100%; height: 100%; border: none; border-radius: 8px;"
                        ></iframe>
                      </template>

                      <!-- Local Video -->
                      <template v-else>
                        <video
                          controls
                          style="width: 100%; height: 100%; border-radius: 8px; object-fit: cover;"
                        >
                          <source :src="storageUrl(vid.video_url)" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </template>
                    </v-responsive>
                  </v-col>
                </v-row>

                <div v-else-if="post" class="text-center text-medium-emphasis text-body-2 py-4">
                  No videos available
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import DOMPurify from "dompurify";
import { marked } from "marked";
import navbar from "../navbar/navbar.vue";

const route = useRoute();
const router = useRouter();

const post = ref({
  title: "",
  content: "",
  images: [],
  videos: []
});

const BASE_API_URL = "https://ftrip.tech/api2";
const id = route.params.id;

const fetchPost = async () => {
  try {
    const res = await axios.get(`${BASE_API_URL}/api/posts/${id}`);
    if (res.data.data) {
      post.value = res.data.data;
      if (!post.value.images) post.value.images = [];
      if (!post.value.videos) post.value.videos = [];
    }
  } catch (err) {
    console.error(err);
  }
};

// Make plain URLs clickable
const makeLinksClickable = (text) => {
  if (!text) return '';
  return text.replace(/(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
};
const getFirstLink = (text) => {
  if (!text) return null
  const match = text.match(/https?:\/\/[^\s]+/)
  return match ? match[0] : null
}

const sanitizedContent = computed(() => {
  if (!post.value.content) return "";
  const withClickableLinks = makeLinksClickable(post.value.content);
  const htmlContent = marked(withClickableLinks);
  return DOMPurify.sanitize(htmlContent);
});

const storageUrl = (path) => {
  if (!path) return "https://placehold.co/200x200/cccccc/333333?text=No+Image";
  if (path.startsWith("http")) return path;
  return `https://ftrip.tech/storage/${path}`;
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null;
};

const goBack = () => router.push("/events");

onMounted(fetchPost);
</script>

<style scoped>
.v-card { border-radius: 8px; }

h2, h3 { color: #05204A; }

.main-background { background-color: #f5f5f5; }
.main-content-frame {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.custom-post-card { border: none; background: #ffffff; box-shadow: none !important; padding: 0 !important; }

.clean-image { border-radius: 4px; border: 1px solid #e0e0e0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

.post-content a {
  color: #1976D2;
  text-decoration: underline;
  cursor: pointer;
}
</style>
