<template>
  <v-app>
    <!-- Navbar -->
    <navbar />

    <v-main class="my-10" v-if="service">
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col cols="12" lg="10" xl="8">
            <!-- Header -->
            <div class="text-center mb-8">
              <h1 class="text-h3 font-weight-bold mb-4 text-primary">
                {{ service.title }}
              </h1>
            </div>

            <!-- Image Carousel -->
            <v-carousel cycle hide-delimiter-background height="500" v-if="service.image && service.image.length">
              <v-carousel-item v-for="(img, idx) in service.image" :key="idx">
                <v-img :src="`https://ftrip.tech/storage/${img}`" cover height="500" />
              </v-carousel-item>
            </v-carousel>

            <!-- 📄 Description -->
            <div class="mt-10 text-body-1 leading-relaxed">
              <template v-for="(block, index) in descriptionBlocks" :key="index">
                <!-- Text (safe HTML produced by parser, rendered with v-html) -->
                <div v-if="block.type === 'text'" class="mb-6" v-html="block.content"></div>

                <!-- Image -->
                <div v-else-if="block.type === 'image'" class="text-center mb-8">
                  <v-img
                    :src="block.src"
                    :alt="block.alt"
                    max-height="400"
                    contain
                    class="rounded-lg mx-auto mb-2"
                  />
                  <div v-if="block.caption" class="text-caption text-medium-emphasis">
                    {{ block.caption }}
                  </div>
                </div>
              </template>
            </div>

            <!-- 🎥 YouTube Links Section -->
            <div v-if="service.links && service.links.length" class="text-center mt-8">
              <h3 class="text-h6 font-weight-bold mb-4 text-primary">Watch Related Videos</h3>

              <div class="flex flex-wrap justify-center gap-4">
                <a
                  v-for="(link, idx) in service.links"
                  :key="idx"
                  :href="link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <v-btn color="red darken-1" prepend-icon="mdi-youtube" variant="flat">
                    Watch on YouTube
                  </v-btn>
                </a>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <div v-else class="text-center my-10">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <Footer />
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Footer from "../footer/Footer.vue";
import navbar from "../navbar/navbar.vue";

const route = useRoute();
const service = ref(null);

// fetch service
const fetchServiceById = async () => {
  try {
    const id = route.params.id;
    const response = await axios.get(`https://ftrip.tech/api1/api/expertises/${id}`);
    service.value = response.data.data;
  } catch (error) {
    console.error("Error fetching service detail:", error);
  }
};

// helper regex for URLs
const URL_REGEX = /https?:\/\/[^\s<>"]+/g;

/**
 * Parse an HTML string, walk text nodes and replace URLs with anchor elements.
 * Returns sanitized HTML string preserving original tags.
 *
 * Note:
 * - href uses the original matched URL.
 * - link text shows a decoded, human-readable label if the URL had percent-encoding.
 */
function htmlMakeLinksClickable(htmlString) {
  // DOMParser available in browser
  const parser = new DOMParser();
  // parse as text/html so existing tags are preserved
  const doc = parser.parseFromString(htmlString, "text/html");

  // recursive walker for nodes
  function walk(node) {
    // don't walk into <a> tags (to avoid double-wrapping)
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === "a") {
      return;
    }

    // For text nodes, replace URLs with link nodes
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue;
      if (!text) return;

      // find URLs in this text node
      const parts = [];
      let lastIndex = 0;
      let match;
      while ((match = URL_REGEX.exec(text)) !== null) {
        const url = match[0];
        const idx = match.index;
        if (idx > lastIndex) {
          parts.push(document.createTextNode(text.slice(lastIndex, idx)));
        }

        // create anchor element
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
        a.style.color = "#1976D2";
        a.style.textDecoration = "underline";

        // try to decode percent-encoded url for display (safe: displayed as text node)
        let displayText = url;
        try {
          // only decode if it contains % (avoid throwing)
          if (url.includes("%")) {
            const decoded = decodeURIComponent(url);
            // if decoded contains spaces or HTML-like tokens, keep original display to avoid confusion
            if (typeof decoded === "string" && !/[<>{}]/.test(decoded)) {
              displayText = decoded;
            }
          }
        } catch (e) {
          // decode error -> keep original
          displayText = url;
        }

        a.appendChild(document.createTextNode(displayText));
        parts.push(a);

        lastIndex = idx + url.length;
      }

      if (parts.length > 0) {
        if (lastIndex < text.length) {
          parts.push(document.createTextNode(text.slice(lastIndex)));
        }
        // replace the original text node with the new nodes
        parts.forEach((n) => node.parentNode.insertBefore(n, node));
        node.parentNode.removeChild(node);
      }
      return;
    }

    // for element nodes, recurse into children except script/style
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.tagName.toLowerCase();
      if (tag === "script" || tag === "style") return;
      // convert NodeList to array to avoid live-list issues while modifying
      const children = Array.from(node.childNodes);
      children.forEach((child) => walk(child));
    }
  }

  // start walking from body children
  Array.from(doc.body.childNodes).forEach((child) => walk(child));

  // serialize body innerHTML back to string
  return doc.body.innerHTML;
}

/**
 * Build description blocks from service.description.
 * Supports {{img:src|caption}} markers and preserves any existing HTML.
 */
const descriptionBlocks = computed(() => {
  if (!service.value || !service.value.description) return [];

  const blocks = [];
  // split on our image placeholders but keep them in array
  const parts = service.value.description.split(/(\{\{img:.*?\}\})/g);

  parts.forEach((part) => {
    if (!part || part.trim() === "") return;

    // image block
    if (part.startsWith("{{img:") && part.endsWith("}}")) {
      const imgContent = part.slice(6, -2);
      const [srcRaw, ...captionParts] = imgContent.split("|");
      const srcTrim = srcRaw.trim();
      const src = srcTrim.startsWith("http") ? srcTrim : `https://ftrip.tech/storage/${srcTrim}`;
      const caption = captionParts.join("|").trim();

      blocks.push({
        type: "image",
        src,
        alt: caption || "Service Image",
        caption,
      });

      return;
    }

    // text / HTML block - we want to preserve existing HTML tags while converting plain URLs inside text nodes
    // first, trim but keep internal spacing/newlines: we treat the whole part as HTML input
    const processedHtml = htmlMakeLinksClickable(part);

    // Some backends may send plain newline-separated paragraphs; preserve line breaks by converting double newlines to <p> if needed.
    // But only wrap if processedHtml has no top-level block tags to avoid double-wrapping.
    let finalHtml = processedHtml.trim();

    // If the finalHtml is plain text without block-level tags, convert single/double newlines to <p> / <br>.
    // Quick heuristic: if there is no <p>, <div>, <h, <ul>, <ol> tags present — wrap into paragraphs.
    if (!/<\/?(p|div|h\d|ul|ol|table|blockquote|section)\b/i.test(finalHtml)) {
      // split by two or more newlines to paragraphs
      const paraParts = finalHtml.split(/\n{2,}/g).map((s) => s.trim()).filter(Boolean);
      if (paraParts.length > 1) {
        finalHtml = paraParts.map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
      } else {
        // single block: convert single newlines to <br>
        finalHtml = finalHtml.replace(/\n/g, "<br>");
      }
    }

    blocks.push({
      type: "text",
      content: finalHtml,
    });
  });

  return blocks;
});

onMounted(fetchServiceById);
</script>

<style scoped>
.leading-relaxed {
  line-height: 1.8;
}

.text-primary {
  color: #05204a;
}

.description-box a {
  color: #1976d2;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .text-h3 {
    font-size: 1.75rem !important;
  }
}
</style>
