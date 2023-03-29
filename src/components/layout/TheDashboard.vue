<script setup>
import TheSidebar from './TheSidebar.vue';
import TheHeader from './TheHeader.vue';
</script>

<template>
  <div class="dark:bg-d-body flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <TheSidebar />

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-x-hidden overflow-y-auto">

      <!-- Header -->
      <TheHeader />

      <!-- Page Content -->
      <section className="px-12 pt-8 flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide">
        <!-- <div className="bg-green-100 p-2 rounded-lg space-y-2">
           <slot></slot> 
          <p>Here comes main content</p> 
        </div> -->
        <slot></slot>
      </section>
    </main>
  </div>
</template>