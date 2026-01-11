<template>
  <v-container fluid class="py-10 bg-light">
    <v-row justify="center" align="stretch" class="gap-6 ga-16">
      <!-- Card 1 -->
      <v-col cols="12" sm="6" md="4">
        <v-card class="rounded-lg border-green text-center" elevation="0">
          <v-img
            src="./image/home_photo.jpg"
            height="250"
            cover
            class="rounded-t-lg"
          ></v-img>
          <v-card-text>
            <h3 class="text-h5 font-weight-bold mt-2">Food Technology</h3>
            <p class="text-body-2">
              Laboratory analysis, product testing, packaging design support.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Card 3 -->
      <v-col cols="12" sm="6" md="4">
        <v-card class="rounded-lg border-green text-center" elevation="0">
          <v-img
            src="./image/home_photo2.jpg"
            height="250"
            cover
            class="rounded-t-lg"
          ></v-img>
          <v-card-text>
            <h3 class="text-h5 font-weight-bold mt-2">Food Technology</h3>
            <p class="text-body-2">
              Laboratory analysis, product testing, packaging design support.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// No script needed
</script>

<style scoped>
.bg-light {
  background-color: #f9fbf7; /* light background */
}
.border-green {
  border: 1px solid #4caf50; /* thin green border */
}
.rounded-t-lg {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.rounded-lg {
  border-radius: 12px;
}
</style>
