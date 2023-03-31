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
      <section className="px-12 py-8  flex-1 overflow-x-hidden scrollbar-hide">
        <!-- All the pages will render here....... -->
        <slot></slot>
      </section>
    </main>
  </div>
</template>