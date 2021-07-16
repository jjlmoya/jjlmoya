<template>
    <div class="layout-default">
        <Header />
        <slot></slot>
        <ChatBot />
    </div>
</template>

<script>
    import Header from '@/components/Core/Header.vue'
    import ChatBot from '@/components/Core/Chat/Index.vue'

    export default {
        components: {
            Header,
            ChatBot
        }
    }
</script>

<style lang="postcss">

</style>