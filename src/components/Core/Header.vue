<template>
    <div class="header">
        <Logo />
        <div class="header__links">
            <NavMenu />
        </div>
        <SelectI18N />
    </div>
</template>

<script>
    import NavMenu from '@/components/Core/NavMenu.vue'
    import Logo from '@/components/Core/Logo.vue'
    import SelectI18N from '@/components/Core/Locales.vue'

    export default {
        components: {
            NavMenu,
            Logo,
            SelectI18N
        },
    
    }
</script>

<style lang="postcss">
  .header {
    position: fixed;
    width: 100%;
    height: em(100px, 0);
    display: grid;
    grid-template-columns: 100px 1fr auto;
    z-index: 100;
    color: var(--color-primary-inside);
    justify-content: center;
    align-items: center;
    grid-gap: em(36px);
    background-color: var(--color-primary);
    border-bottom: em(2px) solid var(--color-secondary-lighter);
    padding-right: em(16px);

    &__links {
      justify-self: end;
    }
  }
</style>