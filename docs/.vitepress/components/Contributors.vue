<script setup lang="ts">
import { ref } from 'vue'

const contributors = ref<{ id: string, avatar_url: string, login: string, html_url: string }[]>([])

fetch('https://api.github.com/repos/rrd108/vue-mess-detector/contributors')
  .then(res => res.json())
  .then((data) => {
    contributors.value = data
  })
  .catch((err) => {
    console.error(err)
  })
</script>

<template>
  <div>
    <h2>Contributors</h2>
    <ul>
      <li v-for="contributor in contributors" :key="contributor.id">
        <img :src="contributor.avatar_url" :alt="contributor.login" width="50" height="50">
        <a :href="contributor.html_url" target="_blank" rel="noopener noreferrer">
          {{ contributor.login }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.vp-doc li + li {
  margin:0
}
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap:1em;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  img {
    border-radius: 50%;
  }
  a {
    text-decoration: none;
  }
</style>
