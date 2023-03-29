<script setup>
import TheSidebarIcons from './portions/TheSidebarIcons.vue';
import TheSidebarContent from './portions/TheSidebarContent.vue';
</script>

<template>
  <div class="gb-body dark:bg-d-body-accent w-80 flex-shrink-0 h-screen flex border-r border-gray/30 
  dark:border-gray/10"
  >
  
    <!-- Sidebar icons section -->
    <TheSidebarIcons />

    <!-- Sidebar content section {Jobs} -->
    <TheSidebarContent />

  </div>
</template>