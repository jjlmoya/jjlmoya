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
    padding: 20px;

    &__title {
      font-size: em(32px);
      padding-bottom: 40px;
      text-align: center;
    }
  }
</style>