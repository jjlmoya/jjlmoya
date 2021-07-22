<template>
    <div class="card-skill u-text-bold">
        <div class="card-skill__name">
            {{ name }}
        </div>
        <div class="card-skill__level">
            <span v-for="i in level" :key="i" class="fas fa-star"></span>
            <span v-for="i in 5 - level" :key="i" class="far fa-star"></span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                default:  ''
            },
            level: {
                type: [String, Number],
                default: undefined
            },
            options: {
                type: Object,
                default: () => ({})
            }
        },
    }
</script>

<style lang="postcss">
  .card-skill {
    display: grid;
    grid-template-columns: 1fr auto;
    width: 300px;

    &__level {
      color: var(--color-yellow);
    }
  }
</style>