<template>
  <div class="grid place-content-center h-full">
    <div v-if="loading" class="h-full grid place-content-center">
      <LoaderMd />
    </div>
    <div v-show="!loading" class="w-96 px-4 py-8 bg-body dark:bg-d-body-accent-secondary rounded-lg shadow-sm flex flex-col items-center space-y-4">
      <h3 class="capitalize text-[24px] text-black dark:text-body font-medium">
        Update The Job
      </h3>
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
            <input type="number" required id="initSalary" v-model="job.initSalary" class="input-type"/>
          </label>
          <label for="maxSalary" class="block">
            <span class="label">Job Maximum Salary:</span>
            <input type="number" id="maxSalary" v-model="job.maxSalary" class="input-type"/>
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
import { useFlash } from '@/composables/useFlash';
import LoaderMd from '@/components/spiners/LoaderMd.vue';

const { flash } = useFlash();
const { job, loading } = storeToRefs(useJobStore());
const { fetchAndSetJob, updateJobById } = useJobStore();
const route = useRoute();
const router = useRouter();
const jobId = computed(() => route.params.jobId);

onMounted(async () => {
  await fetchAndSetJob(jobId.value);
});

async function onSubmit() {
  // Check if any of the required fields is empty
  if (!job.value.name || !job.value.code || !job.value.initSalary) {
    flash('Invalid Data','Some of the required input fields are left blank', 'error')
    return;
  }
  await updateJobById(jobId.value, job.value);
  router.push('/');
  flash('Success', `The job has successfully updated`, 'success')
}
</script>
