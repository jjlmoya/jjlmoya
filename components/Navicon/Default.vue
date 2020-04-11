<template>
    <div class="navicon">
        <img class="navicon__image" :src="image" :alt="title">
    </div>
</template>
<style lang="scss">@import 'default.scss';
</style>

<script>
    export default {
        props: {
            image: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>
