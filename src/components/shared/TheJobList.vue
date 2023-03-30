<template>
  <div class="space-y-2 h-[37rem] overflow-y-auto">
    <div 
      v-for="job in jobs" :key="job.id" 
      :class="[
        'cursor-pointer px-4 group py-[0.7rem]',
        activeJobId === job.id ? 'bg-body-accent dark:bg-d-body-accent-secondary border-r-4 border-primary' : ''
      ]"
      @click="activeJobId = job.id"
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
const activeJobId = ref(null);

onMounted(async () => {
  const fetchedJobs = await jobStore.fetchJobs();
  jobStore.updateJobs(fetchedJobs);
  jobs.value = jobStore.jobs;

  if (!activeJobId.value && jobs.value.length > 0) {
    activeJobId.value = jobs.value[0].id;
  }
});

</script>
