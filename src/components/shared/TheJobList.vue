<template>
  <div class="space-y-2 h-[37rem] overflow-y-auto scrollbar-hide">
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
import { useSelectedJobStore } from '@/stores/SelectedJobStore.js';
import { ref, onMounted, watch, computed } from 'vue';

const jobStore = useJobStore();
const selectedJobStore = useSelectedJobStore();
const activeJobId = ref(null);

const jobs = computed(() => {
  return jobStore.jobs;
});

onMounted(async () => {
  const fetchedJobs = await jobStore.fetchJobs();
  jobStore.updateJobs(fetchedJobs);

  // Checking if no current selected job and make the first to be selected
  if (!activeJobId.value && jobs.value.length > 0) {
    activeJobId.value = jobs.value[0].id;
  }
});

// Changing the selectedJobStore on selected job
watch(activeJobId, (newVal) => {
  const selectedJob = jobs.value.find((job) => job.id === newVal);
  if (selectedJob) {
    selectedJobStore.id = selectedJob.id;
    selectedJobStore.name = selectedJob.name;
    selectedJobStore.code = selectedJob.code;
  }
});

</script>
