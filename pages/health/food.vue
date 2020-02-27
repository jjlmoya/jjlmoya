<template>
    <div class="health food" :class="theme">
        <Layout>
            <h1>Portfolio</h1>
            <h2>Habilidades</h2>
            <h2>Proyectos</h2>
            <h2>Empresas</h2>
        </Layout>
    </div>
</template>

<script>
    import Layout from '@/layouts/Default.vue'
    import SeoService from '@/services/seoService'
    const SEO_PAGE_DATA = new SeoService({
        title: 'Title',
        description: 'Description'
    })
    export default {
        name: 'HealthFood',
        components: {
            Layout
        },
        head () {
            return SEO_PAGE_DATA.getMetas()
        }
    }
</script>
