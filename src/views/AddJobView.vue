<template>
  <div className="flex bg-body dark:bg-d-body-accent h-full rounded-lg">
    <div class="flex-1 grid place-content-center">
      <div class="w-96 px-4 py-8 bg-[#f1f3fd] dark:bg-d-body-accent-secondary rounded-lg shadow-sm flex flex-col items-center space-y-4">
        <h3 className='capitalize text-[24px] text-black dark:text-body font-medium'>
          Create New Job
        </h3>
        <form @submit.prevent="onSubmit" class="space-y-4" noValidate>
          <div class="space-y-2">
            <label for="name" class="block">
              <span class="label">Job Name:</span>
              <input type="text" required id="name" v-model="newJob.name" class="input-type"/>
            </label>
            <label for="code" class="block">
              <span class="label">Job Code:</span>
              <input type="text" required id="code" v-model="newJob.code" class="input-type"/>
            </label>
            <label for="initSalary" class="block">
              <span class="label">Job Initial Salary:</span>
              <input type="text" required id="initSalary" v-model="newJob.initSalary" class="input-type"/>
            </label>
            <label for="maxSalary" class="block">
              <span class="label">Job Maximum Salary:</span>
              <input type="text" required id="maxSalary" v-model="newJob.maxSalary" class="input-type"/>
            </label>
          </div>
          <div>
            <button
              className="w-full bg-primary hover:bg-primary-dark transition-all py-2.5 px-10 rounded-md
              text-white font-bold text-lg text-center"
              type="submit"
            >
              Create
            </button>
          </div>
          
        </form>
      </div>
    </div>
    <div class="w-96 bg-primary dark:bg-primary-dark rounded-r-lg"></div>
  </div>
</template>

<script setup>
import { useJobStore } from '@/stores/JobStore';
import { ref } from 'vue';

const jobStore = useJobStore();

const newJob = ref({
  name: '',
  code: '',
  initSalary: '',
  maxSalary: ''
});

function onSubmit() {
  jobStore.createJob(newJob.value);
  newJob.value = {
    name: '',
    code: '',
    initSalary: '',
    maxSalary: ''
  };
}
</script>