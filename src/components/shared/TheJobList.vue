<template>
  <div class="space-y-2 h-[37rem] overflow-y-auto scrollbar-hide">
    <div 
      v-for="job in jobs" :key="job.id" 
      class="cursor-pointer group px-4 py-[0.7rem]"
      :class="{'bg-[#f1f3fd] dark:bg-d-body-accent-secondary border-r-4 border-primary': isCurrentRoute(`/jobs/applicants/${job.code}`) }"
      @click="activeJobId = job.id"
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
import { useJobStore } from '@/stores/JobStore.js';
import { useSelectedJobStore } from '@/stores/SelectedJobStore.js';
import { ref, onMounted, watch, computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const jobStore = useJobStore();
const selectedJobStore = useSelectedJobStore();
const activeJobId = ref(null);

const jobs = computed(() => {
  return jobStore.jobs;
});

onMounted(async () => {
  await jobStore.fetchAndSetJobs();
});

// Changing the selectedJobStore on selected job
watch(activeJobId, (newVal) => {
  const selectedJob = jobs.value.find((job) => job.id === newVal);
  if (selectedJob) {
    selectedJobStore.id = selectedJob.id;
    selectedJobStore.name = selectedJob.name;
    selectedJobStore.code = selectedJob.code;
    selectedJobStore.initSalary = selectedJob.initSalary;
    selectedJobStore.maxSalary = selectedJob.maxSalary;
  }
});

// The job of the current path
const route = useRoute();

function isCurrentRoute(path) {
  return route.path === path;
}
</script>
