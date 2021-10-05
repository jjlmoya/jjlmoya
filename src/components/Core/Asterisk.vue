 
<template>
    <div class="asterisk">
        <svg
            class="asterisk__svg"
            :class="{'asterisk__svg--secondary': secondary}"
            width="500"
            height="500"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M176.802 279.412L0 229.072L33.2207 126.697L208.333 197.398L197.072 0H307.432L296.171 201.357L466.779 131.787L500 235.294L319.82 285.633L438.063 436.086L348.536 500L246.059 334.842L144.707 494.344L55.1802 433.258L176.802 279.412Z" />
        </svg>
    </div>
</template>

<script>
  
    export default {
        components: {
    
        },
        props: {
            secondary: {
                type: Boolean,
                default: false
            },
        },
    
    }
</script>

<style lang="postcss">
  .asterisk {
    &__svg {
      fill: var(--color-primary);

      &--light {
        fill: var(--color-primary-lighter);
      }

      &--secondary {
        fill: var(--color-secondary-lighter);
      }
    }
  }
</style>
