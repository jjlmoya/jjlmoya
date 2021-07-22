<template>
    <div class="header">
        <Logo />
        <UserProfile />
        <NavMenu />
    </div>
</template>

<script>
    import UserProfile from '@/components/User/Profile.vue'
    import NavMenu from '@/components/Core/NavMenu.vue'
    import Logo from '@/components/Core/Logo.vue'

    export default {
        components: {
            UserProfile,
            NavMenu,
            Logo
        },
    
    }
</script>

<style lang="postcss">
  .header {
    height: 100px;
    border-bottom: 1px solid var(--color-black);
    display: grid;
    grid-template-columns: auto 1fr auto;
  }
</style>