<template>
  <header class="dark:bg-d-body-accent lg:h-[5.5rem] xl:h-[6rem] flex flex-col justify-end space-y-4 
    lg:px-8 xl:px-12 px-4 pt-2 lg:pt-0 border-b border-gray/30 dark:border-gray/10"
  >
    <div class="flex items-center justify-between">
      <IconMenuSm class="lg:hidden text-black dark:text-white" @click="showDrawer = true" />
      <div>
        <p v-if="loading" class="dark:text-body">Loading job...</p>
        <p v-if="error" class="dark:text-body">Something is wrong</p>
        <p v-if="selectedJob && !loading" class="text-black dark:text-white font-medium 
          lg:text-2xl xl:text-3xl capitalize"
        >
          {{selectedJob.name}}
        </p>
        <p v-if="!selectedJob && !loading" class="text-black dark:text-white font-medium text-xl 
          lg:text-2xl xl:text-3xl capitalize"
        >
          Admin Dashboard
        </p>
      </div>
      <div class="lg:hidden flex items-center space-x-2">
        <div class="flex items-center justify-center rounded-lg h-[1.5rem] w-[1.5rem] bg-[#d8dadd] 
          dark:bg-[#454959]"
          @click="toggleDark()"
        >
          <!-- show IconLight when in light mode -->
          <template v-if="!isDark">
            <IconLight />
          </template>
          <!-- show IconDark when in dark mode -->
          <template v-else>
            <IconDark />
          </template>
        </div>
        <RouterLink to="/jobs/add-new">
          <IconPlus/>
        </RouterLink>
      </div>
      <div class="hidden lg:inline-flex space-x-4 items-center">
        <div
          class="grid place-content-center group rounded-full lg:h-[1.8rem] lg:w-[1.8rem] xl:h-[2rem] 
          xl:w-[2rem] border cursor-pointer hover:bg-danger hover:border-none"
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
            class="grid place-content-center group rounded-full lg:h-[1.8rem] lg:w-[1.8rem] xl:h-[2rem] 
            xl:w-[2rem] border cursor-pointer hover:bg-primary hover:border-none"
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
    <div class="hidden lg:inline-flex space-x-10 text-black-accent dark:text-d-white">
      <RouterLink to="/">
        <p class="relative xl:text-lg hover:text-black dark:hover:text-white" 
          :class="{'text-black font-medium dark:text-white': isCurrentRoute('/') }"
        >
          All Applicants
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.10rem] sm:h-[0.20rem] w-1/2': isCurrentRoute('/') }"></span>
        </p>
      </RouterLink>
      <p class="relative xl:text-lg" 
        :class="{'text-black font-medium dark:text-white': hasApplicantsInPath}"
      >
        Job Applicants
        <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.26rem] w-1/2': hasApplicantsInPath}"></span>
      </p>
      <RouterLink to="/jobs/add-new">
        <p class="relative xl:text-lg hover:text-black dark:hover:text-white" 
          :class="{'text-black font-medium dark:text-white': isCurrentRoute('/jobs/add-new') }"
        >
          Add Job
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.26rem] w-1/2': isCurrentRoute('/jobs/add-new') }"></span>
        </p>
      </RouterLink>
      <RouterLink :to="selectedJob ? '/jobs/update/' + selectedJob.id : ''">
        <p v-if="selectedJob || hasUpdateInPath" 
          class="relative xl:text-lg hover:text-black dark:hover:text-white" 
          :class="{'text-black font-medium dark:text-white': hasUpdateInPath }"
        >
          Update Job
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.26rem] w-1/2': hasUpdateInPath }"></span>
        </p>
      </RouterLink>
    </div>
    <div class="flex items-center justify-center lg:hidden space-x-4 sm:space-x-10 text-black-accent 
      dark:text-d-white"
    >
      <RouterLink to="/">
        <p class="relative hover:text-black text-sm dark:hover:text-white" 
          :class="{'text-black font-medium dark:text-white': isCurrentRoute('/') }"
        >
          All Applicants
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.10rem] sm:h-[0.20rem] w-1/2': isCurrentRoute('/') }"></span>
        </p>
      </RouterLink>
      <p class="relative text-sm" 
        :class="{'text-black font-medium dark:text-white': hasApplicantsInPath}"
      >
        Job Applicants
        <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.10rem] sm:h-[0.20rem] w-1/2': hasApplicantsInPath}"></span>
      </p>
      <RouterLink to="/jobs/add-new">
        <p class="relative text-sm hover:text-black dark:hover:text-white" 
          :class="{'text-black font-medium dark:text-white': isCurrentRoute('/jobs/add-new') }"
        >
          Add Job
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.10rem] sm:h-[0.20rem] w-1/2': isCurrentRoute('/jobs/add-new') }"></span>
        </p>
      </RouterLink>
      <!-- <RouterLink :to="selectedJob ? '/jobs/update/' + selectedJob.id : ''">
        <p v-if="selectedJob || hasUpdateInPath"  
          class="relative text-sm hover:text-black dark:hover:text-white" 
          :class="{'text-black font-medium dark:text-white': hasUpdateInPath }"
        >
          Update
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.10rem] sm:h-[0.20rem] w-1/2': hasUpdateInPath }"></span>
        </p>
      </RouterLink> -->
    </div>

    <!-- Drawer -->
    <div class="fixed inset-0 h-screen bg-black bg-opacity-50 z-50 p-4" 
      :class="{ 'hidden': !showDrawer }"
    >
      <div class="h-full w-full bg-green-200 dark:bg-d-body-accent overflow-hidden">
        <div class="flex justify-between px-4 py-2 border-b border-gray-200">
          <h2 class="text-lg font-medium">Drawer Title</h2>
          <button class="text-gray-500 hover:text-gray-700 focus:outline-none" @click="showDrawer = false">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="h-auto max-h-[90%] px-4 py-2 overflow-y-auto scrollbar-hide">
          <!-- Add your list items here -->
          <ul class="space-y-2">
            <li class="text-gray-600 dark:text-gray-400">Item 1</li>
            <li class="text-gray-600 dark:text-gray-400">Item 2</li>
            <li class="text-gray-600 dark:text-gray-400">Item 3</li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>


<script setup>
import IconPen from '../icons/IconPen.vue';
import IconDelete from '../icons/IconDelete.vue';
import IconUserAdd from '../icons/IconUserAdd.vue';
import IconMenuSm from '../icons/IconMenuSm.vue';
import IconPlus from '../icons/IconPlus.vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useSelectedJobStore } from '@/stores/SelectedJobStore.js';
import { useJobStore } from "@/stores/JobStore.js";
import { computed, watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlash } from '@/composables/useFlash';
import { useConfirmFlash } from '@/composables/confirmFlash';
import IconLight from '@/components/icons/IconLight.vue'
import IconDark from '@/components/icons/IconDark.vue'
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const { selectedJob, loading, error } = storeToRefs(useSelectedJobStore());
const { deleteJob } = useJobStore();
const route = useRoute();
const router = useRouter();
const { flash } = useFlash();
const { confirmFlash } = useConfirmFlash();
const showDrawer = ref(false);

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