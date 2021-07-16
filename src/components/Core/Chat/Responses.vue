<template>
    <div class="chat-responses" @click="$emit('response', message)">
        <div class="chat-responses__content">
            {{ message.text }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: Object,
                default: () => ({})
            },
        },
        emits: ['response']
    }
</script>

<style lang="postcss">
  .chat-responses {
    margin-right: 20%;

    &__content {
      width: %;
      border-radius: em(15px);
      padding: em(15px);
      margin: em(10px) em(10px);
      background-color: var(--color-primary);
    }
  }
</style>