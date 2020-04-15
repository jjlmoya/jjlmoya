<template>
    <nav class="menu">
        <img class="menu__element avatar" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Lakeyboy_Silhouette.PNG">
        <div class="menu__element">
            JJLMOYA
        </div>
        <div class="menu__element menu__icons">
            <a class="menu__element-icon" href="https://www.linkedin.com/in/jjlmoya/">
                <img src="https://lh3.googleusercontent.com/proxy/nmBUcdg1NFKqTSia0TKUDkuB5mcmjlbuLXyEfzyMCbhNwqiFGl4_okFywnkLIwVUPA3D-hH2ZbSJtbxZXbN21AB9rr66O5vsKTbk1zCvg2u8dp3XchYTLyyn0dACQfU" alt="linkedin">
            </a>
            <a class="menu__element-icon" href="https://github.com/jjlmoya">
                <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/15221874341530102002-256.png" alt="github">
            </a>
        </div>
        <div v-for="nav in navigation" :key="nav" class="menu__element text">
            <a :href="link"> {{ nav.name }} </a>
        </div>
    </nav>
</template>
<style lang="scss">@import 'default.scss';
</style>

<script>
    export default {
        name: 'MenuNavigation',
        components: {},
        computed: {
            navigation () {
                return [{
                            name: 'Projects',
                            link: ''
                        },
                        {
                            name: 'Tools',
                            link: ''
                        },
                        {
                            name: 'Companies',
                            link: ''
                        }]
            }
        }
    }
</script>
