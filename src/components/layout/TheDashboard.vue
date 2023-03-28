<script setup>
import TheSidebar from './TheSidebar.vue';
import TheHeader from './TheHeader.vue';
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <TheSidebar />

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      
      <!-- Header -->
      <TheHeader />

      <!-- Page Content -->
      <div class="bg-green-300 px-4 py-8">
        <!-- <slot></slot> -->
        <p>Here comes main content</p>
      </div>
    </main>
  </div>
</template>