<script setup>
import TheSidebar from './TheSidebar.vue';
import TheHeader from './TheHeader.vue';
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <TheSidebar />

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-x-hidden overflow-y-auto">

      <!-- Header -->
      <TheHeader />

      <!-- Page Content -->
      <section className="p-4 bg-red-200 flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide">
        <div className="bg-green-100 min-h-full p-2 rounded-lg space-y-2">
          <!-- <slot></slot> -->
          <p>Here comes main content</p>
        </div>
      </section>
    </main>
  </div>
</template>