<template>
    <div class="l-default l-default--background">
        <div class="l-default__background"></div>
        <HeaderDefault />
        <div class="l-default__main">
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
    import HeaderDefault from '@/components/Header/Default.vue'
    import Footer from '@/components/Footer/Default.vue'

    export default {
        name: 'DefaultLayout',
        components: {
            HeaderDefault,
            Footer
        }
    }
</script>
