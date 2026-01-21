<template>
  <!-- Footer -->

  <v-footer color="green-lighten-3" class="py-4">

    <v-container>
      <v-row>
        <!-- Left side: contact info -->
        <v-col
          cols="12"
          md="6"
          class="text-caption text-white d-flex flex-column ga-1"
        >
          <div class="d-flex align-center ga-2" v-if="footer.email">
            <v-icon size="small">mdi-email</v-icon>
            <span>
              Email:
              <a :href="`mailto:${footer.email}`" class="text-white">
                {{ footer.email }}
              </a>
            </span>
          </div>

          <div class="d-flex align-center ga-2" v-if="footer.phone">
            <v-icon size="small">mdi-phone</v-icon>
            <span>
              Phone:
              <a :href="`tel:${footer.phone}`" class="text-white">
                {{ footer.phone }}
              </a>
            </span>
          </div>

          <div class="d-flex align-center ga-2" v-if="footer.follow_us">
            <v-icon size="small">mdi-earth</v-icon>
            <span>
              Follow us:
              <a
                v-if="footer.follow_us.facebook"
                :href="footer.follow_us.facebook"
                target="_blank"
                class="text-white"
                >Facebook</a
              >
              <span v-if="footer.follow_us.twitter"> | </span>
              <a
                v-if="footer.follow_us.twitter"
                :href="footer.follow_us.twitter"
                target="_blank"
                class="text-white"
                >Telegram Channel</a
              >
            </span>
          </div>
        </v-col>

        <!-- Right side: organization info -->
        <v-col cols="12" md="6" class="text-caption text-white text-md-right">
          <p v-if="footer.descreptions">{{ footer.descreptions }}</p>
        </v-col>
        <!-- map -->
         <v-col>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.1496533087857!2d103.2355829!3d13.0897004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3105497f31bbb6f9%3A0x818b93866b1cd30c!2sAgroBio4Cam%20-%20ABC!5e0!3m2!1skm!2skh!4v1768551588386!5m2!1skm!2skh" 
        width="600" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
         </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const footer = ref({});

onMounted(async () => {
  try {

    const response = await axios.get("https://ftrip.tech/api2/api/footers");

    if (response.data.status === "success" && response.data.data.length > 0) {
      footer.value = response.data.data[0];
    }
  } catch (error) {
    console.error("Error fetching footer:", error);
  }
});
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
