<template>
    <div class="chat-message" :class="{'chat-message--receiver': !sender}">
        <div class="chat-message__content">
            {{ message }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            sender: {
                type: Boolean,
                default: true
            },
            message: {
                type: String,
                default: ''
            },
        },
        setup() {
      
        }
    }
</script>

<style lang="postcss">
  .chat-message {
    margin-right: 20%;

    &__content {
      width: %;
      border-radius: em(5px);
      padding: em(15px);
      margin: em(10px) em(10px);
      border: 1px solid var(--color-primary);
    }

    &--receiver {
      margin-right: 0;
      margin-left: 20%;

      .chat-message__content {
        border: none;
        background-color: var(--color-info);
        color: var(--color-white);
      }
    }
  }
</style>