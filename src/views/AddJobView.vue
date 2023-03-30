<template>
  <div className="flex bg-body-accent dark:bg-d-body-accent-secondary h-full rounded-lg">
    <div class="flex-1 grid place-content-center text-gray">
      <div>
        <h1>Create a New Job</h1>
        <form @submit.prevent="onSubmit">
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="newJob.name" />
          </div>
          <div>
            <label for="code">Code:</label>
            <input type="text" id="code" v-model="newJob.code" />
          </div>
          <div>
            <label for="initSalary">Initial Salary:</label>
            <input type="text" id="initSalary" v-model="newJob.initSalary" />
          </div>
          <div>
            <label for="maxSalary">Maximum Salary:</label>
            <input type="text" id="maxSalary" v-model="newJob.maxSalary" />
          </div>
          <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
    <div class="w-96 bg-primary rounded-r-lg">Background color</div>
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