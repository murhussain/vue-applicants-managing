<template>
  <div :class="bgColor" class="relative h-[2.7rem] sm:h-[2.8rem] lg:h-[3rem] xl:h-12 rounded-xl flex justify-end items-center">
    <div :class="[levelColor, 'progress-bar']" 
      class="absolute h-[2.7rem] sm:h-[2.8rem] lg:h-[3rem] xl:h-12 top-0 left-0 rounded-xl flex items-center"
      :style="{ width: progressBarWidth, background: levelColor }"
    >
      <div class="ml-4 flex items-center space-x-2">
        <slot name="icon" />
        <p class="text-white lg:text-xl font-medium" v-if="title">{{ title }}</p>
      </div>
    </div>
    <p :class="statColor" class="text-sm font-medium mr-4 animate-bounce ">
      {{ applicantsCategory }}/{{totalApplicants}}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  applicantsCategory: {
    type: Number,
    required: true,
  },
  totalApplicants: {
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
  },
  maxValue: {
    type: Number,
    default: 100,
  },
});

const progressBarWidth = ref('0%');

const percentage = computed(() => {
  if (props.applicantsCategory === 0 && props.totalApplicants === 0) {
    return '0%';
  }
  return `${(props.applicantsCategory / props.totalApplicants) * 100}%`;
});

watch(percentage, (newValue) => {
  progressBarWidth.value = newValue;
});

</script>

<style scoped>
.progress-bar {
  transition: width 1s ease-out;
}
</style>
