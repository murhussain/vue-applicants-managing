<!-- <template>
  <p class="text-primary text-2xl">Hello Gaella</p>
  <RouterView />
</template>

<script setup lang="ts">
</script> -->

<script setup lang="ts">
import TheDashboard from '@/components/layout/TheDashboard.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <TheDashboard>
    <RouterView />
  </TheDashboard>
</template>