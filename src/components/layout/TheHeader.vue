<script setup>
import IconPen from '../icons/IconPen.vue';
import IconDelete from '../icons/IconDelete.vue';
import IconUserAdd from '../icons/IconUserAdd.vue';
</script>

<template>
  <header class="bg-gray-200 h-[7rem] flex flex-col justify-end space-y-4 px-12 border-b border-gray/25">
    <div class="flex items-center justify-between">
      <p class="text-black font-medium text-3xl capitalize">Senior java developer</p>
      <div class="flex space-x-4 items-center">
        <div class="rounded-icons">
          <IconDelete />
        </div>
        <div class="rounded-icons">
          <IconPen />
        </div>
        <div class="primary-button-rounded">
          <IconUserAdd />
          <span>Invite candidate</span>
        </div>
      </div>
    </div>
    <div class="flex space-x-10">
      <p class="relative text-black text-xl pb-[0.8rem]">
        Kanban board
        <span class="absolute bottom-0 left-0 bg-primary h-1/6 w-1/2"></span>
      </p>
      <p class="relative text-black-accent text-xl pb-[0.8rem]">
        Job info
        <span class="hidden hover:block absolute bottom-0 left-0 bg-primary h-1/6 w-1/2"></span>
      </p>
    </div>
  </header>
</template>