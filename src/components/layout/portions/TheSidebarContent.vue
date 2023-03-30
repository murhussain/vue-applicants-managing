<script setup>
import IconSearch from '@/components/icons/IconSearch.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import TheJob from '@/components/shared/TheJob.vue';
import { RouterLink } from 'vue-router';
import { useJobStore } from '@/stores/JobStore.js';
import { ref, onMounted } from 'vue';


const jobStore = useJobStore();
const jobs = ref([]);

let selectedJob = null;

onMounted(async () => {
  const fetchedJobs = await jobStore.fetchJobs();
  jobStore.updateJobs(fetchedJobs);
  jobs.value = jobStore.jobs;
});
</script>

<template>
  <div class="flex-1 flex flex-col justify-between h-full">
    <div class="space-y-4">
      <!-- The header section of the sidebar -->
      <div class="h-[4.7rem] flex items-center justify-between p-4 border-b border-gray/25 dark:border-gray/10">
        <p class="text-black dark:text-body font-medium text-2xl">Jobs</p>
        <div class="flex items-center space-x-4">
          <IconSearch />
          <RouterLink to="/add-job">
            <div class="p-1 bg-primary flex items-center rounded-xl justify-center">
              <IconPlus />
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- The jobs section -->
      <div class="space-y-2 h-[37rem] overflow-y-auto">
        <TheJob 
          v-for="job in jobs" :key="job.id"
          :jobId="job.id"
          :jobName="job.name"
          :jobInitSalary="job.initSalary"
          :jobMaxSalary="job.maxSalary"
          :isSelected="selectedJob === job.id"
          @click="selectedJob = job.id"
        />
      </div>

    </div>

    <!-- Footer section otf the sidebar -->
    <div class="grid place-content-center mb-4">
      <button class="bg-[#d8dadd] dark:bg-d-body-accent-secondary text-black dark:text-d-white font-medium rounded-lg py-[0.3rem] px-8 ">
        Manage jobs
      </button>
    </div>
  </div>
</template>