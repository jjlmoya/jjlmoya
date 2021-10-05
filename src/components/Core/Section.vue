<template>
    <div class="core-section">
        <div class="core-section__content">
            <div class="core-section__title u-text-bold">
                <h2>{{ title }}</h2>
                <Asterik 
                    class="core-section__asterisk"
                />
            </div>
            <slot />
        </div>
        <BasicForm :reverse="!!(order % 2)" />
    </div>
</template>

<script>
    import Asterik from '@/components/Core/Asterisk.vue'
    import BasicForm from '@/components/Shape/Basic.vue'

    export default {
        components: {
            Asterik,
            BasicForm
        },
        props: {
            title: {
                type: String,
                default:  ''
            },
            order: {
                type: Number,
                default:  0
            }
        },
    }
</script>

<style lang="postcss">
  .core-section {
    position: relative;
    overflow: hidden;

    &__content {
      padding: em(24px) em(32px);
    }

    &__title {
      font-size: var(--font-size-h1);
      padding-bottom: em(8px);
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: em(8px);
    }

    &__asterisk {
      height: em(8px);
      width: em(8px);
      margin: em(-8px);
    }
  }

  .shape {
    position: absolute;
    background:
      linear-gradient(
        0deg,
        var(--color-primary) 50%,
        rgba(0, 0, 0, 0) 100%
      );
  }
</style>