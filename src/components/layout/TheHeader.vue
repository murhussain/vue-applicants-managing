<template>
  <header class="dark:bg-d-body-accent h-[6rem] flex flex-col justify-end space-y-4 px-12 border-b 
    border-gray/30 dark:border-gray/10"
  >
    <div class="flex items-center justify-between">
      <p v-if="loading" class="dark:text-body">Loading job...</p>
      <p v-if="error" class="dark:text-body">{{ error.message }}</p>
      <p v-if="selectedJob && !loading" class="text-black dark:text-white font-medium text-3xl 
        capitalize"
      >
        {{selectedJob.name}}
      </p>
      <p v-if="!selectedJob && !loading" class="text-black dark:text-white font-medium text-3xl 
        capitalize"
      >
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
          @click="deleteSelectedJob(selectedJob.id)"
        >
          <IconDelete 
            :class="{'text-danger dark:text-red-500 animate-pulse': selectedJob }"
          />
        </div>
        <RouterLink :to="selectedJob ? '/jobs/update/' + selectedJob.id : ''">
          <div
            class="grid place-content-center group rounded-full h-[2rem] w-[2rem] border cursor-pointer 
            hover:bg-primary hover:border-none"
            :class="{
              'pointer-events-none border-gray dark:border-gray/60': !selectedJob, 
              'border-primary dark:border-primary': selectedJob,
              'bg-primary border-none': hasUpdateInPath
            }"
          >
            <IconPen 
              :class="{
                'text-body dark:text-whit': hasUpdateInPath,
                'text-primary dark:text-primary animate-pulse': selectedJob 
              }"
            />
          </div>
        </RouterLink>
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
      <RouterLink :to="selectedJob ? '/jobs/update/' + selectedJob.id : ''">
        <p v-if="selectedJob || hasUpdateInPath" class="relative text-lg" 
          :class="{'text-black font-medium dark:text-white': hasUpdateInPath }"
        >
          Update Job
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.26rem] w-1/2': hasUpdateInPath }"></span>
        </p>
      </RouterLink>
    </div>
  </header>
</template>


<script setup>
import IconPen from '../icons/IconPen.vue';
import IconDelete from '../icons/IconDelete.vue';
import IconUserAdd from '../icons/IconUserAdd.vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useSelectedJobStore } from '@/stores/SelectedJobStore.js';
import { useJobStore } from "@/stores/JobStore.js";
import { computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlash } from '@/composables/useFlash';
import { useConfirmFlash } from '@/composables/confirmFlash';

const { selectedJob, loading, error } = storeToRefs(useSelectedJobStore());
const { deleteJob } = useJobStore();
const route = useRoute();
const router = useRouter();
const { flash } = useFlash();
const { confirmFlash } = useConfirmFlash();

async function deleteSelectedJob(id) {
  const result = await confirmFlash('Delete Job', 'Are you sure you want to delete this job?', 'warning');
  if (result.isConfirmed) {
    await deleteJob(id);
    router.push('/');
    flash('Success', `The job has been successfully deleted.`, 'success');
  }
}

function isCurrentRoute(path) {
  return route.path === path;
}

const hasApplicantsInPath = computed(() => {
  return /^\/jobs\/applicants\/.+/.test(route.path);
});

const hasUpdateInPath = computed(() => {
  return /^\/jobs\/update\/.+/.test(route.path);
});

// Clear selected job when navigating away from the job applicants page
watch(hasApplicantsInPath, (hasApplicants) => {
  if (!hasApplicants) {
    useSelectedJobStore().job = null;
  }
});
</script>