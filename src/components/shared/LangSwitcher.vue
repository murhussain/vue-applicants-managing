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

<script>
  import { useI18n } from 'vue-i18n'
  import Tr from "@/i18n/translation"

  export default {
    setup() {
      const { t, locale } = useI18n()
      const supportedLocales = Tr.supportedLocales
      const switchLanguage = async (event) => {
        const newLocale = event.target.value
        await Tr.switchLanguage(newLocale)
      }
      return { t, locale, supportedLocales, switchLanguage } // <--- 4
    }
  }
</script>