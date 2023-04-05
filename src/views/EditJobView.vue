<template>
  <div class="grid place-content-center h-full">
    <div class="w-96 px-4 py-8 bg-body dark:bg-d-body-accent-secondary rounded-lg shadow-sm flex flex-col items-center space-y-4">
      <h3 className='capitalize text-[24px] text-black dark:text-body font-medium'>
        Update The Job
      </h3>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div class="space-y-2">
          <label for="name" class="block">
            <span class="label">Job Name:</span>
            <input type="text" required id="name" class="input-type" :value="selectedJob.name" ref="nameInputRef" />
          </label>
          <label for="code" class="block">
            <span class="label">Job Code:</span>
            <input type="text" required id="code" class="input-type" :value="selectedJob.code" ref="codeInputRef" />
          </label>
          <label for="initSalary" class="block">
            <span class="label">Job Initial Salary:</span>
            <input type="text" required id="initSalary" class="input-type" :value="selectedJob.initSalary" ref="initSalaryInputRef" />
          </label>
          <label for="maxSalary" class="block">
            <span class="label">Job Maximum Salary:</span>
            <input type="text" required id="maxSalary" class="input-type" :value="selectedJob.maxSalary" ref="maxSalaryInputRef" />
          </label>
        </div>
        <div>
          <button
            class="w-full bg-primary hover:bg-primary-dark transition-all py-2.5 px-10 rounded-md text-white font-bold text-lg text-center"
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
  import { ref } from 'vue';
  import { useJobStore } from '@/stores/JobStore.js';
  import { useSelectedJobStore } from '@/stores/SelectedJobStore.js';

  const selectedJob = useSelectedJobStore();
  const jobStore = useJobStore();

  const nameInputRef = ref(null);
  const codeInputRef = ref(null);
  const initSalaryInputRef = ref(null);
  const maxSalaryInputRef = ref(null);

  function onSubmit() {
    const updatedJob = {
      name: nameInputRef.value.value,
      code: codeInputRef.value.value,
      initSalary: initSalaryInputRef.value.value,
      maxSalary: maxSalaryInputRef.value.value,
    };
    jobStore.updateJob(selectedJob.id, updatedJob);
  }
</script>
