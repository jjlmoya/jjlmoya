<template>
    <div class="l-default l-default--background" :class="`${active ? 'is-active' : ''}`">
        <div class="l-default__main">
            <div class="l-default__menu">
                <Menu />
            </div>
            <div class="l-default__content">
                <slot />
            </div>
        </div>
        <div class="l-default__toggle" @click="toggle"></div>
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
        },
        data () {
            return {
                active: true
            }
        },
        methods: {
            toggle () {
                this.active = !this.active
            }
        }
    }
</script>
