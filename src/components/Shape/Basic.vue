
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
    bottom: 0;
    height: 25%;
    width: 150%;
    left: -25%;
    transform: rotate(185deg);

    &--reverse {
      transform: rotate(175deg);
      right: -25%;
    }
  }
</style>


