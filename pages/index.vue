<template>
    <div class="p-home" :class="theme">
        <Layout>
            <Grid>
                <Navicon :image="'https://img.pngio.com/animation-model-sheet-cartoon-idea-business-worker-png-download-animated-business-png-1680_1680.png'" :title="'About'" />
                <Navicon :image="'https://www.itsyourskills.com/wp-content/uploads/2019/12/multiple-skills.png'" :title="'Habilidades'" />
                <Navicon :image="'https://images.squarespace-cdn.com/content/v1/553490f8e4b0e276c297620e/1529797469880-PC5WAJE1KZ2EO0ID5511/ke17ZwdGBToddI8pDm48kB-2zlWSwJppa90cCEGAmqhZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIF5UtvEzrMfxdVO7ybNbRoDexafUbiSiqrQWjG4iGukE/ideatodone+banner_v07_B.png'" :title="'Habilidades'" />
                <Navicon :image="'https://foryoubg.org/wp-content/uploads/2019/01/free-time.png'" :title="'Habilidades'" />
            </Grid>
        </Layout>
    </div>
</template>

<style lang="scss">
  @import 'index.scss';
</style>

<script>
    import Layout from '@/layouts/Default.vue'
    import Grid from '@/layouts/Grid.vue'
    import Navicon from '@/components/Navicon/Default.vue'

    import SeoService from '@/services/seoService'
    const SEO_PAGE_DATA = new SeoService({
        title: 'Home',
        description: 'Home Description'
    })

    export default {
        name: 'Home',
        components: {
            Layout,
            Grid,
            Navicon
        },
        head () {
            return SEO_PAGE_DATA.getMetas()
        }
    }
</script>
