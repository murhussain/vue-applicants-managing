<template>
  <div class='h-full lg:grid lg:place-content-center overflow-y-auto scrollbar-hide'>
    <div 
      class="sm:w-[40rem] sm:mx-auto lg:w-96 px-2 sm:px-6 pb-8 pt-4 bg-body dark:bg-d-body-accent 
      rounded-lg shadow-sm flex flex-col items-center space-y-4"
    >
    <h3 class="capitalize text-xl lg:text-[24px] text-black dark:text-body font-medium">
        Create New Job
      </h3>
      <form @submit.prevent="onSubmit" class="sm:space-y-6 space-y-5" noValidate>
        <div class="grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 lg:grid-cols-1 lg:space-y-none">
          <label for="name" class="block">
            <span class="label">Job Name:</span>
            <input type="text" required id="name" class="input-type" v-model="newJob.name" />
          </label>
          <label for="code" class="block">
            <span class="label">Job Code:</span>
            <input type="text" required id="code" class="input-type" v-model="newJob.code" />
          </label>
          <label for="initSalary" class="block">
            <span class="label">Job Initial Salary:</span>
            <input type="number" required id="initSalary" class="input-type" v-model="newJob.initSalary" />
          </label>
          <label for="maxSalary" class="block">
            <span class="label">Job Maximum Salary:</span>
            <input type="number" id="maxSalary" class="input-type" v-model="newJob.maxSalary" />
          </label>
        </div>
        <div>
          <button class="w-full bg-primary hover:bg-primary-dark transition-all py-2.5 px-10 rounded-md
            text-white font-bold text-lg text-center" type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { useJobStore } from '@/stores/JobStore';

// const jobStore = useJobStore();
const newJob = ref({
  name: '',
  code: '',
  initSalary: '',
  maxSalary: ''
});

const onSubmit = () => {
  const { name, code, initSalary, maxSalary } = newJob.value;
  const job = {
    name,
    code,
    initSalary,
    maxSalary
  };

  // Create a new job
  // jobStore.createJob(job);

  // Reset the form after submission
  newJob.value = {
    name: '',
    code: '',
    initSalary: '',
    maxSalary: ''
  };
};
</script>