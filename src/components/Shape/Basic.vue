
<template>
    <div 
        class="shape shape-basic"
        :class="{'shape-basic--reverse': reverse}"
    >
    </div>
</template>
<script>
  
    export default {
        props: {
            reverse: {
                type: Boolean,
                default:  false
            }
        },
    }
</script>

<style lang="postcss">
  .shape-basic {
    top: 0;
    height: 100%;
    width: 150%;
    right: 25%;
    bottom: 0;
    opacity: 0.2;
    transform: rotate(15deg);

    &--reverse {
      transform: rotate(-15deg);
      left: 25%;
    }
  }
</style>


