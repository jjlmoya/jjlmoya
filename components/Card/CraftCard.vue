<template>
    <div class="craft-card">
        <div class="craft-card__name">
            {{ name }}
        </div>
        <img :src="`./games/ac/crafting/${image}`">
        <div v-for="material in materials" :key="material.name" class="craft--card__materials">
            <div>{{ material.name }} - {{ material.quantity }}</div>
        </div>
    </div>
</template>

<style lang="scss">
  @import 'craftcard.scss';
</style>

<script>
    export default {
        props: {
            materials: {
                type: Array,
                default: () => []
            },
            name: {
                type: String,
                default: ''
            },
            image: {
                type: String,
                default: ''
            }
        }
    }
</script>
