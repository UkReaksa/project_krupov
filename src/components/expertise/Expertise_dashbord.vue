<template>
    <v-app>
        <div>
            <Banners />
        </div>
        <div>
            <navbar />
        </div>
        <v-main>
            <Expertise />
        </v-main>
    </v-app>
   
</template>

<script setup>
import axios from "axios";
import navbar from "../navbar/navbar.vue";
import Expertise from "./Expertise.vue";
import Banners from "../banner/Banners.vue";

</script>

