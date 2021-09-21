<template>
    <div class="banner-hero">
        <div class="banner-hero__overlay">
            <div class="text">
                Hola
            </div>
        </div>
        <img class="banner-hero__image" src="@/assets/background.jpeg">
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: 'Type'
            },
        },
    }
</script>

<style lang="postcss">
  .banner-hero {
    position: relative;

    &,
    &__image,
    &__overlay {
      height: 100vh;
      width: 100vw;
      object-fit: cover;
    }

    &__overlay {
      position: absolute;
      background: rgb(2, 0, 36);
      background:
        linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.7) 0%,
          rgba(0, 0, 0, 0.3) 50%,
          rgba(0, 0, 0, 0.7) 100%
        );
      display: grid;
      justify-content: center;
      align-items: center;
      font-size: var(--font-size-h3);
    }
  }
</style>