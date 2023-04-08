<template>
  <header class="dark:bg-d-body-accent h-[6rem] flex flex-col justify-end space-y-4 px-12 border-b 
    border-gray/30 dark:border-gray/10"
  >
    <div class="flex items-center justify-between">
      <p v-if="loading" class="dark:text-body">Loading job...</p>
      <p v-if="error" class="dark:text-body">{{ error.message }}</p>
      <p v-if="selectedJob && !loading" class="text-black dark:text-white font-medium text-3xl capitalize">
        {{selectedJob.name}}
      </p>
      <p v-if="!selectedJob && !loading" class="text-black dark:text-white font-medium text-3xl capitalize">
        Admin Dashboard
      </p>
      <div class="flex space-x-4 items-center">
        <div
          class="grid place-content-center group rounded-full h-[2rem] w-[2rem] border cursor-pointer 
          hover:bg-danger hover:border-none"
          :class="{ 
            'pointer-events-none border-gray dark:border-gray/60': !selectedJob, 
            'border-danger dark:border-danger': selectedJob 
          }"
        >
          <IconDelete 
            :class="{'text-danger dark:text-red-500': selectedJob }"
          />
        </div>
        <div
          class="grid place-content-center group rounded-full h-[2rem] w-[2rem] border cursor-pointer 
          hover:bg-primary hover:border-none"
          :class="{
            'pointer-events-none border-gray dark:border-gray/60': !selectedJob, 
            'border-primary dark:border-primary': selectedJob,
            'bg-primary border-none': isCurrentRoute('/jobs/update')
          }"
        >
          <RouterLink to="/jobs/update">
            <IconPen 
              :class="{
                'text-body dark:text-white': isCurrentRoute('/jobs/update'),
                'text-primary dark:text-primary': selectedJob 
              }"
            />
          </RouterLink>
        </div>
        <div class="primary-button-rounded cursor-pointer">
          <IconUserAdd />
          <span>Invite candidate</span>
        </div>
      </div>
    </div>
    <div class="flex space-x-10 text-black-accent dark:text-d-white">
      <RouterLink to="/">
        <p class="relative text-lg" 
          :class="{'text-black font-medium dark:text-white': isCurrentRoute('/') }"
        >
          All Applicants
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.26rem] w-1/2': isCurrentRoute('/') }"></span>
        </p>
      </RouterLink>
      <p class="relative text-lg" 
        :class="{'text-black font-medium dark:text-white': hasApplicantsInPath}"
      >
        Job Applicants
        <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.26rem] w-1/2': hasApplicantsInPath}"></span>
      </p>
      <RouterLink to="/jobs/add-new">
        <p class="relative text-lg" 
          :class="{'text-black font-medium dark:text-white': isCurrentRoute('/jobs/add-new') }"
        >
          Add Job
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.26rem] w-1/2': isCurrentRoute('/jobs/add-new') }"></span>
        </p>
      </RouterLink>
      <RouterLink to="/jobs/update">
        <p v-if="selectedJob" class="relative text-lg" 
          :class="{'text-black font-medium dark:text-white': isCurrentRoute('/jobs/update') }"
        >
          Update Job
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.26rem] w-1/2': isCurrentRoute('/jobs/update') }"></span>
        </p>
      </RouterLink>
    </div>
  </header>
</template>


<script setup>
import IconPen from '../icons/IconPen.vue';
import IconDelete from '../icons/IconDelete.vue';
import IconUserAdd from '../icons/IconUserAdd.vue';
import { RouterLink, useRoute } from 'vue-router';
import { useSelectedJobStore } from '@/stores/SelectedJobStore.js';
import { useJobStore } from "@/stores/JobStore.js";
import { computed, watch } from 'vue';
import { storeToRefs } from 'pinia';

const jobStore = useJobStore();
const { selectedJob, loading, error } = storeToRefs(useSelectedJobStore());


const route = useRoute();

const deleteJob = async (id) => {
  await jobStore.deleteJob(id);
};

function isCurrentRoute(path) {
  return route.path === path;
}

const hasApplicantsInPath = computed(() => {
  return /^\/jobs\/applicants\/.+/.test(route.path);
});

// const classes = computed(() => {
//   return {
//     'text-black font-medium dark:text-white': hasApplicantsInPath.value,
//   };
// });

// Clear selected job when navigating away from the job applicants page
watch(hasApplicantsInPath, (hasApplicants) => {
  if (!hasApplicants) {
    useSelectedJobStore().job = null;
  }
});


</script>