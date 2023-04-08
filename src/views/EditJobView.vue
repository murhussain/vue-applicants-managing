<template>
  <div class="grid place-content-center h-full">
    <div class="w-96 px-4 py-8 bg-body dark:bg-d-body-accent-secondary rounded-lg shadow-sm flex flex-col items-center space-y-4">
      <h3 class="capitalize text-[24px] text-black dark:text-body font-medium">
        Update The Job
      </h3>
      <p>{{jobId}}</p>
      <p v-if="loading" class="dark:text-body">Loading job...</p>
      <p v-if="error" class="dark:text-body">{{ error.message }}</p>
      <p v-if="job">{{ job.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useJobStore } from '@/stores/JobStore.js';
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';

const { job, loading, error } = storeToRefs(useJobStore());
const { fetchAndSetJob, updateJob } = useJobStore();
const route = useRoute();
const jobId = computed(() => route.params.jobId);

onMounted(async () => {
  await fetchAndSetJob(jobId.value);
});
</script>
