<template>
  <div className="flex bg-body-accent dark:bg-d-body-accent-secondary h-full rounded-lg">
    <div class="flex-1 grid place-content-center text-gray">
      hello there
    </div>
    <div class="w-96 bg-primary rounded-r-lg">Background color</div>
  </div>
</template>

<script>
// import { useJobStore } from '@/stores/JobStore.vue';
// import { useRouter } from 'vue-router';

// export default {
//   setup() {
//     const jobStore = useJobStore();
//     const router = useRouter();
//     const jobId = Number(router.currentRoute.value.params.id);
//     const job = jobStore.jobs.find(job => job.id === jobId) || {};

//     const updateJob = async () => {
//       await jobStore.updateJob(job);
//       router.push('/');
//     };

//     return { job, updateJob };
//   },
// };
</script>