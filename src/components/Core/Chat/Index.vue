<template>
    <div class="chat-bot">
        <div class="chat-bot__icon">
            <span v-if="!active" class="far fa-comment" @click="toggleActive"></span>
        </div>
        <div v-show="active" class="chat-bot__content">
            <ChatContent @close="toggleActive" />
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import ChatContent from '@/components/Core/Chat/Content.vue'
    export default {
        components: {
            ChatContent,
        },
        setup() {
            const active = ref(false)
            const toggleActive = () => {
                active.value = !active.value
            }
            return {
                active,
                toggleActive
            }
        }
    }
</script>

<style lang="postcss">
  .chat-bot {
    position: fixed;
    right: var(--gap-container);
    bottom: var(--gap-container);

    &__icon {
      display: grid;
      justify-content: center;
      align-items: center;
      font-size: em(24px);
      background-color: black;
      color: var(--color-white);
      height: em(32px);
      width: em(32px);
      border-radius: 50%;
    }

    &__content {
      position: fixed;
      right: var(--gap-container);
      bottom: var(--gap-container);
    }
  }
</style>