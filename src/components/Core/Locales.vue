<template>
    <div class="select-locales">
        <div
            v-for="lang in langs"
            :key="lang"
            class="select-locales__item"
            :class="{'select-locales__item--active': locale === lang}"
            @click="changeLocale(lang)"
        >
            <img v-if="lang==='es'" src="@/assets/langs/es.svg">
            <img v-if="lang==='en'" src="@/assets/langs/en.svg">
        </div>
    </div>
</template>

<script>
    import useTranslation from '@/use/translation'

    export default {
        setup() {
            const { locale, langs, change } = useTranslation()
            const changeLocale = (lang) => {
                if (locale === lang) return
                change(lang)
            }
            return {
                locale, 
                langs,
                changeLocale
            }
            
        }
     
    }
</script>

<style lang="postcss">
  .select-locales {
    display: grid;
    grid-auto-flow: column;
    grid-gap: em(8px);
    padding: em(16px);

    &__item {
      font-weight: bold;
      text-transform: uppercase;
      opacity: 0.5;
      cursor: pointer;
      height: em(25px);
      width: em(25px);

      &--active {
        font-weight: 900;
        opacity: 1;
      }
    }
  }
</style>