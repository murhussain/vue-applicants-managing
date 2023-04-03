<script setup>
import IconPen from '../icons/IconPen.vue';
import IconDelete from '../icons/IconDelete.vue';
import IconUserAdd from '../icons/IconUserAdd.vue';
import { RouterLink } from 'vue-router';
import { useSelectedJobStore } from '@/stores/SelectedJobStore.js';
import { useJobStore } from "@/stores/JobStore.js";

const selectedJob = useSelectedJobStore();
const jobStore = useJobStore();

const deleteJob = async (id) => {
  await jobStore.deleteJob(id);
};

</script>

<template>
  <header class="dark:bg-d-body-accent h-[6rem] flex flex-col justify-end space-y-4 px-12 border-b 
    border-gray/30 dark:border-gray/10"
  >
    <div class="flex items-center justify-between">
      <p class="text-black dark:text-white font-medium text-3xl capitalize">
        {{ selectedJob.name }}
      </p>
      <div class="flex space-x-4 items-center">
        <div @click="deleteJob(selectedJob.id)" class="grid place-content-center group 
        rounded-full h-[2rem] w-[2rem] border border-gray dark:border-gray/60 dark:hover:border-d-white 
        hover:bg-primary"
        >
          <IconDelete />
        </div>
        <div class="grid place-content-center group rounded-full h-[2rem] w-[2rem] border border-gray 
        dark:border-gray/60 dark:hover:border-d-white hover:bg-primary"
        >
          <RouterLink to="/jobs/update">
            <IconPen />
          </RouterLink>
        </div>
        <div class="primary-button-rounded">
          <IconUserAdd />
          <span>Invite candidate</span>
        </div>
      </div>
    </div>
    <div class="flex space-x-10">
      <p class="relative text-black dark:text-white text-lg">
        Kanban board
        <span class="absolute bottom-0 left-0 bg-primary h-[0.26rem] w-1/2"></span>
      </p>
      <p class="relative text-black-accent dark:text-d-white text-lg">
        Job info
        <span class="hidden absolute bottom-0 left-0 bg-primary h-[0.26rem] w-1/2"></span>
      </p>
    </div>
  </header>
</template>