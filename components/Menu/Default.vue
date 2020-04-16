<template>
    <nav class="menu">
        <!--<img class="menu__element avatar" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Lakeyboy_Silhouette.PNG">-->
        <div class="menu__element menu__icons">
            <a v-for="social in socialMedias" :key="social.name" class="menu__element-icon" :href="social.link">
                <img :src="social.image" :alt="social.name">
            </a>
        </div>
        <div v-for="nav in navigation" :key="nav.link">
            <div class="menu__element menu__element--menu">
                <a :href="nav.link"> {{ nav.name }} </a>
            </div>
            <div v-for="sub in nav.submenu" :key="sub.link" class="menu__element menu__element--submenu">
                <a :href="sub.link" :target="sub.target ? sub.target : ''">{{ sub.name }}</a>
            </div>
        </div>
    </nav>
</template>
<style lang="scss">@import 'default.scss';
</style>

<script>
    import SocialService from '@/services/socialService'
    import NavigationService from '@/services/navigationService'

    export default {
        name: 'MenuNavigation',
        components: {},
        data () {
            return {
                socialMedias: this.getNetworks(),
                navigation: this.getMenus()
            }
        },
        methods: {
            getNetworks () {
                return new SocialService().getNetworks()
            },
            getMenus () {
                return new NavigationService().getMenus()
            }
        }
    }
</script>
