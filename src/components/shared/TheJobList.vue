
<template>
  <div class="space-y-2 h-[37rem] overflow-y-auto">
    <div 
      v-for="job in jobs" :key="job.id" 
      class="px-4 group hover:bg-body-accent dark:hover:bg-d-body-accent-secondary py-[0.7rem] 
      hover:border-r-4 border-primary"
    >
      <p class="text-black dark:text-d-white capitalized group-hover:font-medium">{{ job.name }}</p>
      <div class="flex items-center space-x-2">
        <p class="text-gray dark:text-d-white-accent">{{ job.initSalary }}</p> 
        <p class="text-gray dark:text-d-white-accent">-</p>
        <p class="text-gray dark:text-d-white-accent">{{ job.maxSalary }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useJobStore } from '@/stores/JobStore.js';
import { ref, onMounted } from 'vue';


const jobStore = useJobStore();
const jobs = ref([]);

onMounted(async () => {
  const fetchedJobs = await jobStore.fetchJobs();
  jobStore.updateJobs(fetchedJobs);
  jobs.value = jobStore.jobs;
});
</script>