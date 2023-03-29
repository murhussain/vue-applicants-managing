<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import TheJob from '@/components/shared/TheJob.vue'
</script>

<template>
  <div class="flex-1 flex flex-col justify-between h-full">
    <div class="space-y-2">
      <!-- The header section of the sidebar -->
      <div class="h-[4.7rem] flex items-center justify-between p-4 border-b border-gray/25">
        <p class="text-black font-medium text-2xl">Jobs</p>
        <div class="flex items-center space-x-4">
          <IconSearch />
          <div class="p-1 bg-primary flex items-center rounded-xl justify-center">
            <IconPlus />
          </div>
        </div>
      </div>

      <!-- The jobs section -->
      <div class="space-y-2">
        <TheJob />
        <TheJob />
        <TheJob />
      </div>

    </div>

    <!-- Footer section otf the sidebar -->
    <div class="grid place-content-center mb-4">
      <button class="bg-[#d8dadd] text-black font-medium rounded-lg py-[0.3rem] px-8 ">
        Manage jobs
      </button>
    </div>
  </div>
</template>