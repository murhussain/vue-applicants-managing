<script setup>
defineProps({
  jobName: String, 
  jobInitSalary: String, 
  jobMaxSalary: String, 
})
</script>

<template>
  <div class="px-4 group hover:bg-body-accent dark:hover:bg-d-body-accent-secondary py-[0.7rem] hover:border-r-4 border-primary">
    <p class="text-black dark:text-d-white capitalized group-hover:font-medium">{{ jobName }}</p>
    <div class="flex items-center space-x-2">
      <p class="text-gray dark:text-d-white-accent">{{ jobInitSalary }}</p> 
      <p class="text-gray dark:text-d-white-accent">-</p>
      <p class="text-gray dark:text-d-white-accent">{{ jobMaxSalary }}</p>
    </div>
  </div>
</template>