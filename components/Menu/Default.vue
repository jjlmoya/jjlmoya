<template>
    <nav class="menu">
        <img class="menu__element avatar" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Lakeyboy_Silhouette.PNG">
        <div class="menu__element">
            JJLMOYA
        </div>
        <div class="menu__element menu__icons">
            <a v-for="social in socialMedias" :key="social" class="menu__element-icon" :href="social.link">
                <img :src="social.image" :alt="social.name">
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
            socialMedias () {
                return [
                    {
                        name: 'Linkedin',
                        image: 'https://lh3.googleusercontent.com/proxy/Lcc45ZRsSN3L8xFkXnp1rE3X34oX2KV7fEiA7GDiQXGzqoaJqKM4bOIh0JezI6V5UIhe_MRuExUHQBJ6GLv01GXibxkEVFdcWsijlMxsUgxaxuPOAQ',
                        link: 'https://www.linkedin.com/in/jjlmoya/'
                    },
                    {
                        name: 'Github',
                        image: 'https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/15221874341530102002-256.png',
                        link: 'https://github.com/jjlmoya'
                    }
                ]
            },
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
