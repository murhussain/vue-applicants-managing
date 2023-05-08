<template>
  <div class="flex-1 flex flex-col justify-between h-full">
    <div class="space-y-[1.5rem]">
      <!-- The header section of the sidebar -->
      <div class="lg:h-[4.2rem] xl:h-[4.4rem] flex items-center justify-between px-3 py-4 border-b border-gray/25 
        dark:border-gray/10"
      >
        <input v-model="searchQuery" className='search-input-type' type="text" placeholder='Search Jobs....' />
        <RouterLink to="/jobs/add-new">
          <div 
            class="grid place-content-center group rounded-lg lg:h-[1.7rem] xl:h-[2rem] lg:w-[1.7rem] 
              xl:w-[2rem] border border-primary dark:border-primary hover:bg-primary hover:border-none"
            :class="{ 'bg-primary border-none': isCurrentRoute('/jobs/add-new') }"
          >
            <IconPlus :class="{ 'text-white dark:text-white': isCurrentRoute('/jobs/add-new') }" />
          </div>
        </RouterLink>
      </div>
      
      <!-- The jobs section -->
      <div class="space-y-2 h-[37rem] overflow-y-auto scrollbar-hide">
        <div v-if="loading" class="h-full grid place-content-center">
          <LoaderMd />
        </div>
        <div
          v-else 
          v-for="job in filteredJobs" :key="job.id" 
          class="cursor-pointer group px-4 py-[0.7rem]"
          :class="{'bg-[#f1f3fd] dark:bg-d-body-accent-secondary border-r-4 border-primary': isCurrentRoute(`/jobs/applicants/${job.code}`) }"
          @click="selectJob(job.id)"
        >
          <RouterLink :to="'/jobs/applicants/' + job.code">  
            <p class="text-black group-hover:font-medium lg:text-sm xl:text-base dark:text-d-white capitalized"
              :class="{'font-medium': isCurrentRoute(`/jobs/applicants/${job.code}`) }"
            >{{ job.name }}</p>
            <div class="flex items-center space-x-2 lg:text-sm xl:text-base text-black-accent dark:text-d-white-accent">
              <p class="">{{ job.initSalary }}$</p> 
              <p v-show="job.maxSalary">-</p>
              <p v-show="job.maxSalary">{{ job.maxSalary }}$</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Footer section otf the sidebar -->
    <div class="grid place-content-center mb-4">
      <!-- <button class="bg-[#d8dadd] dark:bg-d-body-accent-secondary text-black dark:text-d-white 
        font-medium rounded-lg py-[0.3rem] px-8 "
      >Manage jobs</button> -->
      <LangSwitcher />
    </div>
  </div>
</template>

<script setup>
import IconPlus from '@/components/icons/IconPlus.vue';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useJobStore } from '@/stores/JobStore.js';
import { useSelectedJobStore } from '@/stores/SelectedJobStore.js';
import { RouterLink, useRoute } from 'vue-router';
import LoaderMd from '@/components/spiners/LoaderMd.vue';
import LangSwitcher from '@/components/shared/LangSwitcher.vue'

const { jobs, loading } = storeToRefs(useJobStore());
const { fetchAndSetJobs } = useJobStore();
const { selectJob } = useSelectedJobStore();

// State for the search query
const searchQuery = ref('');

fetchAndSetJobs();

// The job of the current path
const route = useRoute();
function isCurrentRoute(path) {
  return route.path === path;
}

// Filter the jobs based on the search query
const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    return job.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});
</script>
