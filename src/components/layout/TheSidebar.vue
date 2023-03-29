<script setup>
// import { RouterLink } from 'vue-router'
import TheSidebarIcons from './portions/TheSidebarIcons.vue';
</script>

<template>
  <div class="w-80 flex-shrink-0 h-screen flex border-r border-gray/25">
  
    <!-- Sidebar icons section -->
    <TheSidebarIcons />

    <!-- Sidebar content section {Jobs} -->
    <div class="flex-1 flex flex-col justify-between h-full">
      <div class="space-y-6">
        <p class="">first</p>
        <p class="">middle</p>
      </div>
      <p class="bg-green-500">last</p>
    </div>

  </div>
</template>