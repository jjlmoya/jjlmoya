<template>
    <div class="layout-default">
        <Header />
        <div class="layout-default__content">
            <slot></slot>
        </div>
        <ChatBot />
        <Footer />
    </div>
</template>

<script>
    import Header from '@/components/Core/Header.vue'
    import Footer from '@/components/Core/Footer.vue'
    import ChatBot from '@/components/Core/Chat/Index.vue'

    export default {
        components: {
            Header,
            ChatBot,
            Footer
        }
    }
</script>

<style lang="postcss">
  .layout-default {
    &__content {
      margin-bottom: -40px;
    }
  }

  .page {
    &--header {
      padding-top: em(100px);
    }
  }

</style>