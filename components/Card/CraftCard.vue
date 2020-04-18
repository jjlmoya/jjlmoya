<template>
    <div class="craft-card">
        <div class="craft-card__name">
            {{ name }}
        </div>
        <img class="craft-card__image" :src="`./games/ac/crafting/${image}`">
        <div class="craft-card__materials">
            <div v-for="material in materials" :key="material.name" class="material__wrap">
                <img class="material__image" :alt="material.name" :src="`./games/ac/crafting/${material.image}`">
                <span>{{ material.quantity }}</span>
            </div>
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
