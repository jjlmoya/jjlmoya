<template>
    <div class="p-home">
        <Layout>
            <Grid>
                <Navicon
                    :image="'https://img.pngio.com/animation-model-sheet-cartoon-idea-business-worker-png-download-animated-business-png-1680_1680.png'"
                    :title="'Sobre Mi'"
                />
                <Navicon
                    :image="'https://img.pngio.com/brain-week-rcd-foundation-cartoon-clipart-full-size-clipart-cartoon-brain-transparent-1517_1280.png'"
                    :title="'Habilidades'"
                />
                <Navicon
                    :image="'https://images.vexels.com/media/users/3/145736/isolated/preview/8e99b5ecf870581da80ce137827eeee4-ideas-machine-cartoon-by-vexels.png'"
                    :title="'Experimental'"
                />
                <Navicon
                    :image="'https://images.vexels.com/media/users/3/136605/isolated/preview/34ac981a5c069eca818364e2466d18cd-pole-vaulting-sport-cartoon-by-vexels.png'"
                    :title="'IRL'"
                />
            </Grid>
        </Layout>
    </div>
</template>

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
