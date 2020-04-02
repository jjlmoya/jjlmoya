<template>
    <div class="p-home" :class="theme">
        <Layout>
            <Grid>
                <h1>Portfolio</h1>
                <h2>Habilidades</h2>
                <h2>Proyectos</h2>
                <h2>Empresas</h2>
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

    import SeoService from '@/services/seoService'
    const SEO_PAGE_DATA = new SeoService({
        title: 'Home',
        description: 'Home Description'
    })

    export default {
        name: 'Home',
        components: {
            Layout,
            Grid
        },
        head () {
            return SEO_PAGE_DATA.getMetas()
        }
    }
</script>
