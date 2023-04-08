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
        All Applicants
      </p>
      <div class="flex space-x-4 items-center">
        <div
          class="grid place-content-center group 
          rounded-full h-[2rem] w-[2rem] border border-gray dark:border-gray/60 dark:hover:border-d-white 
          hover:bg-primary"
        >
          <IconDelete />
        </div>
        <div
          class="grid place-content-center group rounded-full h-[2rem] w-[2rem] border border-gray 
        dark:border-gray/60 dark:hover:border-d-white hover:bg-primary"
          :class="{'bg-primary border-none': isCurrentRoute('/jobs/update') }"
        >
          <RouterLink to="/jobs/update">
            <IconPen :class="{'text-body dark:text-white': isCurrentRoute('/jobs/update') }"/>
          </RouterLink>
        </div>
        <div class="primary-button-rounded">
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
      <p class="relative text-lg" :class="classes">
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
        <p class="relative text-lg" 
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
import { computed } from 'vue';
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

const classes = computed(() => {
  return {
    'text-black font-medium dark:text-white': hasApplicantsInPath.value,
  };
});
</script>