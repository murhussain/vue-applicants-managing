import i18n from "@/i18n"

const Trans = {
  get supportedLocales() {
    return import.meta.env.VITE_SUPPORTED_LOCALES.split(",")
  },

  set currentLocale(newLocale) { // <--- 2
    i18n.global.locale.value = newLocale
  },

  async switchLanguage(newLocale) { // <--- 3
    Trans.currentLocale = newLocale
    document.querySelector("html").setAttribute("lang", newLocale)
  },
}

export default Trans