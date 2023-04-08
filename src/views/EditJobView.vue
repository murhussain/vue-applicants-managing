<template>
  <div class="grid place-content-center h-full">
    <div class="w-96 px-4 py-8 bg-body dark:bg-d-body-accent-secondary rounded-lg shadow-sm flex flex-col items-center space-y-4">
      <h3 class="capitalize text-[24px] text-black dark:text-body font-medium">
        Update The Job
      </h3>
      <p v-if="loading" class="dark:text-body">Loading job...</p>
      <form v-if="job" @submit.prevent="onSubmit" class="space-y-5" noValidate>
        <div class="space-y-2">
          <label for="name" class="block">
            <span class="label">Job Name:</span>
            <input type="text" required id="name" v-model="job.name" class="input-type"/>
          </label>
          <label for="code" class="block">
            <span class="label">Job Code:</span>
            <input type="text" required id="code" v-model="job.code" class="input-type"/>
          </label>
          <label for="initSalary" class="block">
            <span class="label">Job Initial Salary:</span>
            <input type="text" required id="initSalary" v-model="job.initSalary" class="input-type"/>
          </label>
          <label for="maxSalary" class="block">
            <span class="label">Job Maximum Salary:</span>
            <input type="text" id="maxSalary" v-model="job.maxSalary" class="input-type"/>
          </label>
        </div>
        <div>
          <button
            className="w-full bg-primary hover:bg-primary-dark transition-all py-2.5 px-10 rounded-md
            text-white font-bold text-lg text-center"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useJobStore } from '@/stores/JobStore.js';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';

const { job, loading } = storeToRefs(useJobStore());
const { fetchAndSetJob, updateJobById } = useJobStore();
const route = useRoute();
const router = useRouter();
const jobId = computed(() => route.params.jobId);

onMounted(async () => {
  await fetchAndSetJob(jobId.value);
});

async function onSubmit() {
  await updateJobById(jobId.value, job.value);
  router.push('/');
}
</script>
