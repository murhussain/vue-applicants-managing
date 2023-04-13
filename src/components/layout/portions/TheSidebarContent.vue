<template>
  <div class="flex-1 flex flex-col justify-between h-full">
    <div class="space-y-[1.5rem]">
      <!-- The header section of the sidebar -->
      <div class="h-[4.4rem] flex items-center justify-between p-4 border-b border-gray/25 
        dark:border-gray/10"
      >
        <p class="text-black dark:text-body font-medium text-xl">Jobs</p>
        <div class="flex items-center space-x-4">
          <IconSearch />
          <RouterLink to="/jobs/add-new">
            <div 
              class="grid place-content-center group rounded-lg h-[1.8rem] w-[1.8rem] border border-primary 
              dark:border-primary hover:bg-primary hover:border-none"
              :class="{ 'bg-primary border-none': isCurrentRoute('/jobs/add-new') }"
            >
              <IconPlus :class="{ 'text-white dark:text-body': isCurrentRoute('/jobs/add-new') }" />
            </div>
          </RouterLink>
        </div>
      </div>
      
      <!-- The jobs section -->
        <TheJobList />
    </div>

    <!-- Footer section otf the sidebar -->
    <div class="grid place-content-center mb-4">
      <button class="bg-[#d8dadd] dark:bg-d-body-accent-secondary text-black dark:text-d-white 
        font-medium rounded-lg py-[0.3rem] px-8 "
      >
        Manage jobs
      </button>
    </div>
  </div>
</template>

<script setup>
import IconSearch from '@/components/icons/IconSearch.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import TheJobList from '@/components/shared/TheJobList.vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

function isCurrentRoute(path) {
  return route.path === path;
}
</script>