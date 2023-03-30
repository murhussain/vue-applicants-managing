<script setup>
import TheCategories from '@/components/shared/TheCategories.vue';
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

<template>
  <TheCategories />
  <div>
    <h1>Available Jobs</h1>
    <ul>
      <li v-for="job in jobs" :key="job.id">
        {{ job.name }} ({{ job.code }})
      </li>
    </ul>
  </div>
</template>