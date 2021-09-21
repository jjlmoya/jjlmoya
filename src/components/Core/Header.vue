<template>
    <div class="header">
        <div class="header__overlay"></div>
        <Logo />
        <UserProfile />
        <NavMenu />
        <SelectI18N />
    </div>
</template>

<script>
    import UserProfile from '@/components/User/Profile.vue'
    import NavMenu from '@/components/Core/NavMenu.vue'
    import Logo from '@/components/Core/Logo.vue'
    import SelectI18N from '@/components/Core/Locales.vue'

    export default {
        components: {
            UserProfile,
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
    height: em(80px);
    display: grid;
    grid-template-columns: 100px 2fr auto auto;
    z-index: 100;
    color: var(--color-white);
    justify-content: center;
    align-items: center;
    box-shadow: 0 -20px 16px 8px rgba(255, 255, 255, 0.1);
    grid-gap: em(36px);

    &__overlay {
      position: absolute;
      opacity: 0.1;
      height: 100%;
      width: calc(100%);
      margin-left: 75px;
      background-color: var(--color-white);
    }
  }
</style>