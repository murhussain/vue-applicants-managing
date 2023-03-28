<script setup>
import IconPen from '../icons/IconPen.vue';
import IconDelete from '../icons/IconDelete.vue';
import IconUserAdd from '../icons/IconUserAdd.vue';
</script>

<template>
  <header class="bg-gray-200 h-16 flex items-center justify-between px-12">
    <p class="text-black font-medium text-2xl capitalize">Senior java developer</p>
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
  </header>
</template>