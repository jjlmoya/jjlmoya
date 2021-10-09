<template>
    <button
        class="button"
        :class="[
            {'button--ghost': ghost},
            {'button--secondary': secondary}
        ]"
    >
        {{ cta }}
    </button>
</template>

<script>
    export default {
     
        props: {
            ghost: {
                type: Boolean,
                default: false
            },
            secondary: {
                type: Boolean,
                default: false
            },
            cta: {
                type: String,
                default: 'Aceptar'
            },
        },
    }
</script>

<style lang="postcss">
  .button {
    font-size: var(--font-size-h3);
    padding: em(8px) em(16px);
    background-color: var(--color-primary);
    color: var(--color-primary-inside);
    border: 1px solid transparent;
    border-radius: 5px;

    &--secondary {
      background-color: var(--color-secondary);
    }

    &--ghost {
      background-color: transparent;
      border-color: var(--color-primary);
      color: var(--color-primary);
    }
  }

  .button--ghost.button--secondary {
    border-color: var(--color-secondary);
    color: var(--color-secondary);
  }
</style>