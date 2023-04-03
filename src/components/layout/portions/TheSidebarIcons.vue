<template>
  <div class="border-r border-gray/25 dark:border-gray/10 flex flex-col w-[4rem] justify-between h-full">
    <div class="p-4">
      <IconMenu />
      <div class="mt-[3.3rem] flex flex-col space-y-6">
        <RouterLink to='/'>
          <IconHome :class="{ 'text-primary-dark dark:text-primary': isCurrentRoute('/') }" />
        </RouterLink>
        <IconWallet />
        <IconUserGroup />
        <IconMap />
        <IconNotification />
        <IconSetting />
        <IconPower />
      </div>
    </div>
    <div class="mx-auto">
      <button 
      class="flex items-center justify-center rounded-lg h-[2rem] w-[2rem] bg-primary mb-4 mx-2"
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
      </button>
    </div>
  </div>
</template>

<script setup>
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

const isDark = useDark();
const toggleDark = useToggle(isDark);
const route = useRoute();

function isCurrentRoute(path) {
  return route.path === path;
}
</script>