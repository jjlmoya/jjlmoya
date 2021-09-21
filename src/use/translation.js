import { useI18n } from "vue-i18n"

export default () => {

    const { t, locale, availableLocales } = useI18n({ useScope: 'global' })

    const change = (lang) => {
        locale.value = lang
    } 
    const langs = availableLocales
    return { 
        t,
        locale,
        langs,
        change
    }
}
