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
</script>

<template>
  <div class="border-r border-gray/25 flex flex-col w-[4rem] justify-between h-full">
    <div class="p-4">
      <IconMenu />
      <div class="mt-[4rem] flex flex-col space-y-6">
        <IconHome />
        <IconWallet />
        <IconUserGroup />
        <IconMap />
        <IconNotification />
        <IconSetting />
        <IconPower />
      </div>
    </div>
    <button class="flex items-center space-x-4 rounded-full px-1 py-[0.18rem] bg-primary/70 mb-4 mx-1"
    >
      <IconLight />
      <IconDark />
    </button>
  </div>
</template>