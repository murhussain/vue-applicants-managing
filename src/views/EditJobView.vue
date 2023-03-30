<template>
  <div className="flex bg-body-accent dark:bg-d-body-accent-secondary h-full rounded-lg">
    <div class="flex-1 grid place-content-center text-gray">
      <div>
        <h1>Edit Job</h1>
        <form @submit.prevent="updateJob">
          <div>
            <label for="name">Name:</label>
            <input id="name" v-model="job.name" type="text" />
          </div>
          <div>
            <label for="code">Code:</label>
            <input id="code" v-model="job.code" type="text" />
          </div>
          <div>
            <label for="initSalary">Initial Salary:</label>
            <input id="initSalary" v-model="job.initSalary" type="text" />
          </div>
          <div>
            <label for="maxSalary">Maximum Salary:</label>
            <input id="maxSalary" v-model="job.maxSalary" type="text" />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
    <div class="w-96 bg-primary rounded-r-lg">Background color</div>
  </div>
</template>

<script>
import { useJobStore } from '@/stores/job';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const jobStore = useJobStore();
    const router = useRouter();
    const jobId = router.currentRoute.value.params.id;

    const job = jobStore.getJobById(jobId);

    const updateJob = async () => {
      await jobStore.updateJob(job);
      router.push({ name: 'home' });
    };

    return {
      job,
      updateJob,
    };
  },
};
</script>