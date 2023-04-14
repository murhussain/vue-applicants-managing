<template>
  <div class="flex-1 flex flex-col justify-between h-full">
    <div class="space-y-[1.5rem]">
      <!-- The header section of the sidebar -->
      <div class="h-[4.4rem] flex items-center justify-between p-4 border-b border-gray/25 
        dark:border-gray/10"
      >
        <!-- <p class="text-black dark:text-body font-medium text-xl">Jobs</p> -->
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input v-model="searchQuery" type="text" placeholder="Search jobs..." class="px-4 py-1 w-[11rem] border rounded-md">
            <button class="absolute inset-y-0 right-0 px-3 bg-gray-100 hover:bg-gray-200 rounded-r-md">
              <IconSearch />
            </button>
          </div>
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
      <div class="space-y-2 h-[37rem] overflow-y-auto scrollbar-hide">
        <p v-if="loading">Loading posts...</p>
        <p v-if="error">{{ error.message }}</p>
        <div 
          v-for="job in filteredJobs" :key="job.id" 
          class="cursor-pointer group px-4 py-[0.7rem]"
          :class="{'bg-[#f1f3fd] dark:bg-d-body-accent-secondary border-r-4 border-primary': isCurrentRoute(`/jobs/applicants/${job.code}`) }"
          @click="selectJob(job.id)"
        >
          <RouterLink :to="'/jobs/applicants/' + job.code">  
            <p class="text-black group-hover:font-medium text-base dark:text-d-white capitalized"
              :class="{'font-medium': isCurrentRoute(`/jobs/applicants/${job.code}`) }"
            >{{ job.name }}</p>
            <div class="flex items-center space-x-2">
              <p class="text-black-accent dark:text-d-white-accent">{{ job.initSalary }}$</p> 
              <p v-show="job.maxSalary" class="text-black-accent dark:text-d-white-accent">-</p>
              <p v-show="job.maxSalary" class="text-black-accent dark:text-d-white-accent">{{ job.maxSalary }}$</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Footer section otf the sidebar -->
    <div class="grid place-content-center mb-4">
      <button class="bg-[#d8dadd] dark:bg-d-body-accent-secondary text-black dark:text-d-white 
        font-medium rounded-lg py-[0.3rem] px-8 "
      >Manage jobs</button>
    </div>
  </div>
</template>

<script setup>
import IconSearch from '@/components/icons/IconSearch.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useJobStore } from '@/stores/JobStore.js';
import { useSelectedJobStore } from '@/stores/SelectedJobStore.js';
import { RouterLink, useRoute } from 'vue-router';

const { jobs, loading, error } = storeToRefs(useJobStore());
const { fetchAndSetJobs } = useJobStore();
const { selectJob } = useSelectedJobStore();

// State for the search query
const searchQuery = ref('');

fetchAndSetJobs();

// The job of the current path
const route = useRoute();
function isCurrentRoute(path) {
  return route.path === path;
}

// Filter the jobs based on the search query
const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    return job.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});
</script>
