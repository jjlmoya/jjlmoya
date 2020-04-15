<template>
    <div class="navicon">
        <div class="navicon__wrapper">
            <div class="navicon__background"></div>
            <div class="navicon__image">
                <img class="image" :src="image" :alt="title">
            </div>
        </div>
        <div class="navicon__title">
            {{title}}
        </div>
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
