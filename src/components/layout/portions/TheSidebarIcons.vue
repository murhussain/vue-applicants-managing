<template>
  <div class="border-r border-gray/25 dark:border-gray/10 flex flex-col w-[3rem] xl:w-[4rem] justify-between h-full">
    <div class="py-4 mx-auto">
      <IconMenu />
      <div class="lg:mt-[3.6rem] xl:mt-[3.3rem] flex flex-col items-center space-y-6">
        <RouterLink to='/' :class="{ 'lg:h-[1.7rem] xl:h-[2rem] lg:w-[1.7rem] xl:w-[2rem] grid place-content-center rounded-lg bg-primary': isCurrentRoute('/') }">
          <IconHome :class="{ 'text-body hover:text-white dark-hover:text-d-white dark:text-body h-[1.6rem] w-[1.6rem]': isCurrentRoute('/') }" />
        </RouterLink>
        <div :class="{ 'lg:h-[1.7rem] xl:h-[2rem] lg:w-[1.7rem] xl:w-[2rem] grid place-content-center rounded-lg bg-primary': hasApplicantsInPath }">
          <IconUserGroup  :class="{ 'text-body hover:text-white dark-hover:text-d-white dark:text-body h-[1.6rem] w-[1.6rem]': hasApplicantsInPath }" />
        </div>
        <IconWallet />
        <IconMap />
        <IconNotification />
        <IconSetting />
        <IconPower />
      </div>
    </div>
    <div class="mx-auto">
      <div 
      class="flex items-center justify-center rounded-lg lg:h-[2rem] xl:h-[2.1rem] lg:w-[2rem] 
          xl:w-[2.1rem] bg-[#d8dadd] dark:bg-d-body-accent-secondary mb-4 mx-auto"
        @click="toggleDark()"
      >
        <!-- show IconLight when in light mode -->
        <template v-if="!isDark">
          <IconLight />
        </template>
        <!-- show IconDark when in dark mode -->
        <template v-else>
          <IconDark />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconMenu from '@/components/icons/IconMenu.vue'
import IconWallet from '@/components/icons/IconWallet.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconMap from '@/components/icons/IconMap.vue'
import IconUserGroup from '@/components/icons/IconUserGroup.vue'
import IconNotification from '@/components/icons/IconNotification.vue'
import IconSetting from '@/components/icons/IconSetting.vue'
import IconPower from '@/components/icons/IconPower.vue'
import IconLight from '@/components/icons/IconLight.vue'
import IconDark from '@/components/icons/IconDark.vue'
import { useDark, useToggle } from '@vueuse/core';
import { RouterLink, useRoute } from 'vue-router';
import { computed } from 'vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);
const route = useRoute();

function isCurrentRoute(path: string) {
  return route.path === path;
}

const hasApplicantsInPath = computed(() => {
  return /^\/jobs\/applicants\/.+/.test(route.path);
});
</script>