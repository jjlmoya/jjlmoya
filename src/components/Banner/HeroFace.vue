<template>
    <div class="banner-hero">
        <div class="banner-hero__content">
            <img class="banner-hero__image" src="@/assets/background.jpeg">
            <div class="banner-hero__text" v-html="$t('about.description')">
            </div>
        </div>
    </div>
</template>


<script>
    import useApi from '@/use/useApi/index'
    export default {
        props: {
            title: {
                type: String,
                default: 'Type'
            },
        },

        setup() {
            const { user } = useApi()
            const { data: userData } = user?.byId()
            console.log( user?.byId())
            console.log(userData)
        } 
    }
</script>

<style lang="postcss">
  .banner-hero {
    position: relative;
    object-fit: cover;
    display: grid;
    justify-content: center;
    padding: em(16px);

    &__content {
      display: grid;
      justify-content: center;
      align-items: center;
      grid-gap: em(8px);
      width: em(300px);
      text-align: center;
    }

    &__image {
      margin: 0 auto;
      height: em(200px);
      width: em(200px);
      border-radius: 50%;
      border: em(4px) solid var(--color-secondary);
    }
  }
</style>