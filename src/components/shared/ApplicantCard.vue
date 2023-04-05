<template>
  <div class="applicant-card group">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div class="w-10 h-10 bg-third rounded-full"></div>
        <div class="flex flex-col -space-y-1">
          <div class="text-base text-black dark:text-d-white group-hover:font-medium">{{name}}</div>
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
  position: String,
  skills: Array,
});
</script>