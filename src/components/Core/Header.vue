<template>
    <div class="header">
        <UserProfile />
        <NavMenu />
    </div>
</template>

<script>
    import UserProfile from '@/components/User/Profile.vue'
    import NavMenu from '@/components/Core/NavMenu.vue'

    export default {
        components: {
            UserProfile,
            NavMenu
        },
    
    }
</script>

<style lang="postcss">
  .header {
    height: 100px;
    border-bottom: 1px solid black;
    //background-color: #e9e7e8;
  }
</style>