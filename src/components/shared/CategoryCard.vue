<template>
  <div :class="bgColor" class="relative h-12 rounded-xl flex justify-end items-center">
    <div :class="levelColor" class="absolute h-12 top-0 left-0 rounded-xl flex items-center" 
      :style="{ width: completedPercentage }"
    >
      <div class="ml-4 flex items-center space-x-2">
        <slot name="icon"/>
        <p class="text-white text-xl font-medium" v-if="title">{{ title }}</p>
      </div>
    </div>
    <p :class="statColor" class="text-sm font-medium mr-4">{{ completedTasks }}/{{totalTasks}}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  completedTasks: {
    type: Number,
    required: true,
  },
  totalTasks: {
    type: Number,
    required: true,
  },
  bgColor: {
    type: String,
    required: true,
  },
  levelColor: {
    type: String,
    required: true,
  },
  statColor: {
    type: String,
    required: true,
  }
});

const completedPercentage = computed(() => {
  return `${(props.completedTasks / props.totalTasks) * 100}%`;
});
</script>
