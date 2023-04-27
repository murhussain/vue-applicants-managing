<template>
  <header class="dark:bg-d-body-accent lg:h-[5.5rem] xl:h-[6rem] flex flex-col justify-end space-y-4 
    lg:px-8 xl:px-12 px-4 sm:px-10 pt-2 lg:pt-0 border-b border-gray/30 dark:border-gray/10"
  >
    <div class="flex items-center justify-between">
      <IconJob class="lg:hidden text-black dark:text-d-white" @click="showDrawer = true" />
      <div>
        <LoaderSm v-if="loading" />
        <p v-if="selectedJob && !loading" class="text-black dark:text-white font-medium 
          sm:text-2xl xl:text-3xl capitalize"
        >
          {{selectedJob.name}}
        </p>
        <p v-if="!selectedJob && !loading" class="text-black dark:text-white font-medium text-xl 
          sm:text-2xl xl:text-3xl capitalize"
        >
          Admin Dashboard
        </p>
      </div>
      <div class="lg:hidden flex items-center space-x-2">
        <div class="flex items-center justify-center rounded-lg h-[1.5rem] w-[1.5rem] bg-[#d8dadd] 
          dark:bg-[#454959] sm:w-[2rem] sm:h-[2rem]"
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
        <IconVellipsis @click="showMainMenu = true"/>
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
                'text-white dark:text-white': hasUpdateInPath,
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
          :class="{'text-black font-medium pb-1 dark:text-white': isCurrentRoute('/') }"
        >
          All Applicants
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.10rem] sm:h-[0.20rem] w-1/2': isCurrentRoute('/') }"></span>
        </p>
      </RouterLink>
      <p class="relative xl:text-lg" 
        :class="{'text-black font-medium pb-1 dark:text-white': hasApplicantsInPath}"
      >
        Job Applicants
        <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.26rem] w-1/2': hasApplicantsInPath}"></span>
      </p>
      <RouterLink to="/jobs/add-new">
        <p class="relative xl:text-lg hover:text-black dark:hover:text-white" 
          :class="{'text-black font-medium pb-1 dark:text-white': isCurrentRoute('/jobs/add-new') }"
        >
          Add Job
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.26rem] w-1/2': isCurrentRoute('/jobs/add-new') }"></span>
        </p>
      </RouterLink>
      <RouterLink :to="selectedJob ? '/jobs/update/' + selectedJob.id : ''">
        <p v-if="selectedJob || hasUpdateInPath" 
          class="relative xl:text-lg hover:text-black dark:hover:text-white" 
          :class="{'text-black font-medium pb-1 dark:text-white': hasUpdateInPath }"
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
        <p class="relative hover:text-black text-sm sm:text-lg dark:hover:text-white" 
          :class="{'text-black font-medium pb-[0.18rem] dark:text-white': isCurrentRoute('/') }"
        >
          All Applicants
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.10rem] sm:h-[0.20rem] w-1/2': isCurrentRoute('/') }"></span>
        </p>
      </RouterLink>
      <p class="relative text-sm sm:text-lg" 
        :class="{'text-black font-medium pb-[0.18rem] dark:text-white': hasApplicantsInPath}"
      >
        Job Applicants
        <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.10rem] sm:h-[0.20rem] w-1/2': hasApplicantsInPath}"></span>
      </p>
      <RouterLink to="/jobs/add-new">
        <p class="relative text-sm sm:text-lg hover:text-black dark:hover:text-white" 
          :class="{'text-black font-medium pb-[0.18rem] dark:text-white': isCurrentRoute('/jobs/add-new') }"
        >
          New
          <span :class="{'absolute bottom-0 left-0 bg-primary h-[0.10rem] sm:h-[0.20rem] w-1/2': isCurrentRoute('/jobs/add-new') }"></span>
        </p>
      </RouterLink>
    </div>
  </header>
  <!-- Drawer -->
  <div class="fixed inset-0 h-screen bg-black dark:bg-d-white-accent bg-opacity-50 dark:bg-opacity-30 
    z-50 p-4" :class="{ 'hidden': !showDrawer }"
  >
    <div 
      class="max-h-[80%] sm:max-h-[90%] w-full sm:w-1/2 sm:mr-auto bg-body dark:bg-d-body-accent overflow-y-auto 
      scrollbar-hide rounded-lg"
    >
      <div class="sticky top-0 bg-body dark:bg-d-body-accent flex items-center justify-between px-4 py-4 border-b border-gray/40 dark:border-gray/20">
        <IconSearch />
        <input v-model="searchQuery" class="rounded-lg h-[1.7rem] bg-body dark:bg-d-body-accent
        outline-none text-black/80  dark:text-d-white px-4 w-[14rem]" 
          type="text" placeholder='Search Jobs....' 
        />
        <div class="flex items-center justify-center rounded-lg h-[1.5rem] w-[3rem] bg-[#d8dadd] 
        dark:bg-[#454959] text-black dark:text-d-white cursor-pointer"
        @click="showDrawer = false"
        >Esc</div>
      </div>
      <div class="py-4 space-y-2">
        <p v-if="loading">Loading posts...</p>
        <div 
          v-for="job in filteredJobs" :key="job.id" 
          class="cursor-pointer group px-4 py-[0.7rem]"
          :class="{'bg-[#f1f3fd] dark:bg-d-body-accent-secondary border-r-4 border-primary': isCurrentRoute(`/jobs/applicants/${job.code}`) }"
          @click="selectJob(job.id); showDrawer = false"
        >
          <RouterLink :to="'/jobs/applicants/' + job.code">  
            <p class="text-black text-sm dark:text-d-white capitalized"
              :class="{'font-medium': isCurrentRoute(`/jobs/applicants/${job.code}`) }"
            >{{ job.name }}</p>
            <div class="flex items-center space-x-2 text-xs text-black-accent dark:text-d-white-accent">
              <p class="">{{ job.initSalary }}$</p> 
              <p v-show="job.maxSalary">-</p>
              <p v-show="job.maxSalary">{{ job.maxSalary }}$</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <!-- Main menu -->
  <div class="fixed inset-0 h-screen bg-black dark:bg-d-white-accent bg-opacity-50 dark:bg-opacity-30 
    z-50 p-4" :class="{ 'hidden': !showMainMenu }"
  >
    <div 
      class="max-h-[40%] sm:max-h-[70%] w-full sm:w-2/5 sm:ml-auto bg-body dark:bg-d-body-accent overflow-y-auto 
      scrollbar-hide rounded-lg"
    >
      <div class="flex items-center justify-between px-4 py-2 border-b border-gray/40 dark:border-gray/20">
        <p class="text-lg text-black dark:text-d-white font-medium capitalize">Menu</p>
        <IconCross @click="showMainMenu = false" />
      </div>
      <div v-if="job" class="px-4 py-4 space-y-4">
        <RouterLink @click="showMainMenu = false" :to="selectedJob ? '/jobs/update/' + selectedJob.id : ''" 
          class="flex items-center justify-between group"
        >
          <p class="text-lg text-black-accent dark:text-d-white font-medium capitalize">
            Update job
          </p>
          <IconArrowLeft />
        </RouterLink>
        <div @click="deleteSelectedJob(selectedJob.id); showMainMenu = false"
          class="flex items-center justify-between group"
        >
          <p class="text-lg text-black-accent dark:text-d-white font-medium capitalize 
            group-hover:text-black dark:group-hover:text-body"
          >
            Delete job
          </p>
          <IconArrowLeft />
        </div>
      </div>
      <div v-else class="px-4 py-4">
        <p class="text-lg text-black-accent dark:text-d-white font-medium">
          There is still no job selected!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconPen from '../icons/IconPen.vue';
import IconDelete from '../icons/IconDelete.vue';
import IconCross from '../icons/IconCross.vue';
import IconUserAdd from '../icons/IconUserAdd.vue';
import IconJob from '../icons/IconJob.vue';
import IconVellipsis from '../icons/IconVellipsis.vue';
import IconSearch from '../icons/IconSearch.vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useSelectedJobStore } from '@/stores/SelectedJobStore.js';
import { useJobStore } from "@/stores/JobStore.js";
import { computed, watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlash } from '@/composables/useFlash';
import { useConfirmFlash } from '@/composables/confirmFlash';
import IconLight from '@/components/icons/IconLight.vue'
import IconDark from '@/components/icons/IconDark.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import { useDark, useToggle } from '@vueuse/core';
import LoaderSm from '../spiners/LoaderSm.vue';


const isDark = useDark();
const toggleDark = useToggle(isDark);
const { jobs } = storeToRefs(useJobStore());
const { fetchAndSetJobs, deleteJob } = useJobStore();
const { selectJob } = useSelectedJobStore();
const { selectedJob, loading, job } = storeToRefs(useSelectedJobStore());
const route = useRoute();
const router = useRouter();
const { flash } = useFlash();
const { confirmFlash } = useConfirmFlash();
const showDrawer = ref(false);
const showMainMenu = ref(false);
// State for the search query
const searchQuery = ref('');

fetchAndSetJobs();


// Filter the jobs based on the search query
const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    return job.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

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