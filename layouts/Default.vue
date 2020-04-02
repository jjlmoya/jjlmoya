<template>
    <div class="l-default l-default--background">
        <div class="l-default__main">
            <div class="l-default__menu">
                <Menu />
            </div>
            <div class="l-default__content">
                <slot />
            </div>
        </div>
        <Footer />
    </div>
</template>
<style lang="scss">@import 'default.scss';
</style>
<script>
    import Footer from '@/components/Footer/Default.vue'
    import Menu from '@/components/Menu/Default.vue'

    export default {
        name: 'DefaultLayout',
        components: {
            Footer,
            Menu
        }
    }
</script>
