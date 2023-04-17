<template>
  <div class="applicant-card hover:translate-x-6 hover:translate-y-4 hover:shadow-2xl hover:z-90 group">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <img :src="`https://i.pravatar.cc/50?u=${email}`" alt="" 
          class="w-[2.8rem] h-[2.8rem] rounded-full ring-2 dark:border-d-body-accent-secondary 
          border-body ring-primary dark:ring-primary-dark border-[2px]"
        >
        <div class="flex flex-col sm:-space-y-1">
          <div class="text-sm text-black dark:text-d-white group-hover:font-medium">{{name}}</div>
          <div class="text-sm text-black-accent dark:text-d-white-accent">{{position}}</div>
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