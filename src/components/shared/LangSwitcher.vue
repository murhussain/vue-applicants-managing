<template>
  <select @change="switchLanguage" class="appearence-none leading-tight bg-[#d8dadd] dark:bg-d-body-accent-secondary text-black dark:text-d-white 
    font-medium rounded-lg py-[0.5rem] px-6 outline-none">
    <option disabled>Choose lang</option>
    <option
      v-for="sLocale in supportedLocales"
      :key="`locale-${sLocale}`"
      :value="sLocale"
      :selected="locale === sLocale"
    >
      {{ t(`locale.${sLocale}`) }}
    </option>
  </select>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import Tr from '@/i18n/translation'
import { useRouter } from "vue-router"

const { t, locale } = useI18n()
const router = useRouter() 
const supportedLocales = Tr.supportedLocales

const switchLanguage = async (event) => {
  const newLocale = event.target.value
  await Tr.switchLanguage(newLocale)
  try {
    await router.replace({ params: { locale: newLocale } })
  } catch(e) {
    router.push("/")
  }
}
</script>