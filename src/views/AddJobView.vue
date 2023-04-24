<template>
  <div className="grid place-content-center  h-full">
    <div class="w-96 px-4 py-8 bg-body dark:bg-d-body-accent-secondary rounded-lg shadow-sm flex flex-col items-center space-y-4">
      <h3 className='capitalize text-[24px] text-black dark:text-body font-medium'>
        Create New Job
      </h3>
      <form @submit.prevent="onSubmit" class="space-y-5" noValidate>
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
            <input type="number" required id="initSalary" v-model="newJob.initSalary" class="input-type"/>
          </label>
          <label for="maxSalary" class="block">
            <span class="label">Job Maximum Salary:</span>
            <input type="number" id="maxSalary" v-model="newJob.maxSalary" class="input-type"/>
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
</template>

<script setup>
import { useJobStore } from '@/stores/JobStore';
import { useFlash } from '@/composables/useFlash';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const jobStore = useJobStore();
const { flash } = useFlash();
const router = useRouter();

const newJob = ref({
  name: '',
  code: '',
  initSalary: '',
  maxSalary: ''
});

function onSubmit() {
  if (newJob.value.name && newJob.value.code && newJob.value.initSalary) {
    jobStore.createJob(newJob.value);
    flash('Success', 'The job has successfully added', 'success')
    newJob.value = {
      name: '',
      code: '',
      initSalary: '',
      maxSalary: ''
    };
    router.push('/');
  } else {
    flash('Invalid Data','Some of the required input fields are left blank', 'error')
  }
}
</script>