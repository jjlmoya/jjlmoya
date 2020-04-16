<template>
    <div class="p-huerto">
        <Layout>
            Hola
        </Layout>
    </div>
</template>

<script>
    import Layout from '@/layouts/Default.vue'

    import SeoService from '@/services/seoService'
    const SEO_PAGE_DATA = new SeoService({
        title: 'IRL Huerto',
        description: 'Home Description'
    })

    export default {
        name: 'Home',
        components: {
            Layout
        },
        head () {
            return SEO_PAGE_DATA.getMetas()
        }
    }
</script>
