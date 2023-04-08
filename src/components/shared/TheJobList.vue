<template>
  <div class="space-y-2 h-[37rem] overflow-y-auto scrollbar-hide">
    <p v-if="loading">Loading posts...</p>
    <p v-if="error">{{ error.message }}</p>
    <div 
      v-for="job in jobs" :key="job.id" 
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
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useJobStore } from '@/stores/JobStore.js';
import { useSelectedJobStore } from '@/stores/SelectedJobStore.js';
import { RouterLink, useRoute } from 'vue-router';


const { jobs, loading, error } = storeToRefs(useJobStore());
const { fetchAndSetJobs } = useJobStore();
const { selectJob } = useSelectedJobStore();

fetchAndSetJobs();

// The job of the current path
const route = useRoute();
function isCurrentRoute(path) {
  return route.path === path;
}
</script>
