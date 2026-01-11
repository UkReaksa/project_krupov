<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const meals = ref([])

const fetchMeals = async () => {
  try {
    const response = await axios.get('http://localhost:8000/about_us')
    meals.value = response.data
  } catch (error) {
    console.error('Error fetching meals:', error)
  }
}

onMounted(() => {
  fetchMeals()
})
</script>

<template>
  <div>
    <h1>Meals</h1>
    
    <div v-if="meals.length === 0" class="loading-text">
      Loading meals...
    </div>

    <div v-for="item in meals" :key="item.id" class="dataCard">
      <h1>Name: {{ item.title }}</h1>
      <h2>Description: {{ item.description }}</h2>
    </div>
  </div>
</template>

<style>
.loading-text {
  text-align: center;
  font-size: 18px;
  color: #555;
}

.dataCard {
  text-align: center;
  background-color: cornflowerblue;
  color: white;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
}
</style>
