<template>
  <header class="dark:bg-d-body-accent lg:h-[6rem] flex flex-col justify-end space-y-2 lg:space-y-4 
    lg:px-12 px-4 pt-2 lg:pt-0 border-b border-gray/30 dark:border-gray/10"
  >
    <div class="flex items-center justify-between">
      <div @click="showDrawer = true">
        <IconMenuSm class="lg:hidden text-black dark:text-white"/>
      </div>
      <div>
        <p v-if="loading" class="dark:text-body">Loading job...</p>
        <p v-if="error" class="dark:text-body">Something is wrong</p>
        <p v-if="selectedJob && !loading" class="text-black dark:text-white font-medium 
          text-xl lg:text-3xl capitalize"
        >
          {{selectedJob.name}}
        </p>
        <p v-if="!selectedJob && !loading" class="text-black dark:text-white font-medium text-xl 
          lg:text-3xl capitalize"
        >
          Admin Dashboard
        </p>
      </div>
      <div class="lg:hidden flex items-center space-x-4">
        <div class="flex items-center justify-center rounded-lg h-[1.5rem] w-[1.5rem] bg-[#d8dadd] 
          dark:bg-d-body-accent-secondary"
          @click="toggleDark()"
        >
          <!-- show IconLight when in light mode -->
          <template v-if="!isDark">
            <IconLight class="h-[1.1rem] w-[1.1rem]"/>
          </template>
          <!-- show IconDark when in dark mode -->
          <template v-else>
            <IconDark class="h-4 w-4"/>
          </template>
        </div>
        <div class="flex items-center space-x-1"> 
          <IconSearch class="text-black dark:text-white h-10 w-10"/>
          <RouterLink to="/jobs/add-new">
            <IconPlus class="text-black dark:text-white hover:text-primary h-10 w-10"
              :class="{ '': isCurrentRoute('/jobs/add-new') }"
            />
          </RouterLink>
        </div>
      </div>
      <div class="hidden lg:inline-flex space-x-4 items-center">
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
    <div class="hidden lg:inline-flex space-x-10 text-black-accent dark:text-d-white">
      <RouterLink to="/">
        <p class="relative text-lg hover:text-black dark:hover:text-white" 
          :class="{'text-black font-medium dark:text-white': isCurrentRoute('/') }"
        >
          All Applicants
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.10rem] sm:h-[0.20rem] w-1/2': isCurrentRoute('/') }"></span>
        </p>
      </RouterLink>
      <p class="relative text-lg" 
        :class="{'text-black font-medium dark:text-white': hasApplicantsInPath}"
      >
        Job Applicants
        <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.26rem] w-1/2': hasApplicantsInPath}"></span>
      </p>
      <RouterLink to="/jobs/add-new">
        <p class="relative text-lg hover:text-black dark:hover:text-white" 
          :class="{'text-black font-medium dark:text-white': isCurrentRoute('/jobs/add-new') }"
        >
          Add Job
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.26rem] w-1/2': isCurrentRoute('/jobs/add-new') }"></span>
        </p>
      </RouterLink>
      <RouterLink :to="selectedJob ? '/jobs/update/' + selectedJob.id : ''">
        <p v-if="selectedJob || hasUpdateInPath" 
          class="relative text-lg hover:text-black dark:hover:text-white" 
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
    <!-- <div class="lg:hidden fixed top-16 bottom-0 right-0 z-20 w-4/5 lg:w-3/4 px-4 py-6 bg-white dark:bg-d-body"> -->
      
    <div v-if="showDrawer" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
      <div class="bg-white dark:bg-d-bg-accent h-screen overflow-y-auto scrollbar-hide w-64 md:w-80 flex flex-col space-y-6">
        <div class="flex justify-end pr-4 pt-4">
          <div class="h-14 w-14 bg-[#d8dadd] dark:bg-d-body-accent-secondary" 
          
          >X</div>
        </div>
        <div class='grid place-content-center'>
          <div class="flex flex-col items-center space-y-6 py-8">
            <p class='text-gray-accent text-xl'>About</p>
            <p class='text-gray-accent text-xl'>Service</p>
            <p class='text-gray-accent text-xl'>Source</p>
            <p class='text-gray-accent text-xl'>Study Case</p>
            <p class='text-primary text-xl font-semibold'>Log In</p>
          </div>
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
import IconSearch from '../icons/IconSearch.vue';
import IconPlus from '../icons/IconPlus.vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useSelectedJobStore } from '@/stores/SelectedJobStore.js';
import { useJobStore } from "@/stores/JobStore.js";
import { computed, watch } from 'vue';
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
const showDrawer = false;

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