<script setup>
import IconHand from '@/components/icons/IconHand.vue'
</script>

<template>
  <div class="applicant-card">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div class="w-10 h-10 bg-third rounded-full"></div>
        <div class="flex flex-col -space-y-1">
          <div class="text-base text-black dark:text-d-white font-semibold">Irene Sacchi</div>
          <div class="text-sm text-gray dark:text-d-white-accent">Software Engineer</div>
        </div>
      </div>
      <IconHand />
    </div>
    <div class="flex gap-2 flex-wrap">
      <div class="tag">Java</div>
      <div class="tag">.Net</div>
      <div class="tag">CSS</div>
      <div class="tag">Cross platform</div>
    </div>
  </div>
</template>