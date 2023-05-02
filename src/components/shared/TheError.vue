<template>
  <div class="fixed inset-0 h-screen bg-black dark:bg-d-white-accent bg-opacity-50 dark:bg-opacity-30 
    z-50 p-4"
  >
    <div 
      class="max-h-[40%] sm:max-h-[70%] w-full sm:w-2/5 lg:3/5 sm:mx-auto bg-body dark:bg-d-body-accent overflow-y-auto 
      scrollbar-hide rounded-lg"
    >
      <div class="flex items-center justify-between px-4 py-2 border-b border-gray/40 dark:border-gray/20">
        <p class="text-lg text-black dark:text-d-white font-medium capitalize">Error</p>
        <IconCross @click="goBack" />
      </div>
      <div class="mx-auto space-y-4 px-6 py-4">
        <p class="text-sm sm:text-base lg:text-xl text-center text-black-accent dark:text-d-white font-medium">
          <span>Something went wrong!</span>{{"  " + error}}
        </p>
        <div @click="goBack" class="mx-auto w-[10rem] text-center bg-primary hover:bg- primary-dark text-body dark:text-d-white 
        font-medium rounded-lg py-[0.3rem] px-6">Try again</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import IconCross from '@/components/icons/IconCross.vue';

const router = useRouter();
const props = defineProps({
  errorMessage: {
    type: String,
    required: true,
  },
});

const goBack = () => {
  router.go(-1);
};
const error = ref(props.errorMessage);
</script>