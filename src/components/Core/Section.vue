<template>
    <div class="core-section">
        <div class="core-section__title u-text-bold">
            {{ title }}
        </div>
        <slot />
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default:  ''
            }
        },
    }
</script>

<style lang="postcss">
  .core-section {
    padding: em(16px);

    &__title {
      font-size: var(--font-size-h3);
      padding-bottom: em(8px);
      text-align: center;
    }
  }
</style>