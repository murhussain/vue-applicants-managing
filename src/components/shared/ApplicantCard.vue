<template>
  <div class="applicant-card lg:hover:translate-x-2 lg:hover:translate-y-2 lg:hover:shadow-xl
    lg:hover:z-90 group hover:border xl:hover:border-2 border-gray dark:border-gray/40"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2 xl:space-x-2">
        <img :src="`https://i.pravatar.cc/50?u=${email}`" alt="" 
          class="w-[2.5rem] h-[2.5rem] xl:w-[2.8rem] xl:h-[2.8rem] rounded-full ring-2 dark:border-d-body-accent-secondary 
          border-body ring-primary dark:ring-primary-dark border-[2px]"
        >
        <div class="flex flex-col xl:-space-y-1">
          <div class="text-sm xl:text-base text-black dark:text-d-white group-hover:font-medium">{{name}}</div>
          <div class="text-xs xl:text-sm text-black-accent dark:text-d-white-accent">{{position}}</div>
        </div>
      </div>
      <IconHand />
    </div>
    <div class="flex gap-2 flex-wrap">
      <div v-for="(skill, index) in skills" :key="index" class="tag">{{ skill.name }}</div>
    </div>
  </div>
</template>

<script setup>
import IconHand from '@/components/icons/IconHand.vue'

defineProps({
  name: String,
  email: String,
  position: String,
  skills: Array,
});
</script>