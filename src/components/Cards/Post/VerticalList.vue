<template>
    <div class="post-vertical-list">
        <slot />
    </div>
</template>

<script>
 
</script>

<style lang="postcss">
  .post-vertical-list {
    display: grid;
    grid-gap: em(32px);
  }
</style>