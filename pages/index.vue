<template>
    <div class="home" :class="theme">
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

    export default {
        name: 'Home',
        components: {
            Layout
        },
        head () {
            return {
                title: 'jjlmoya',
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'My custom description'
                    }
                ]
            }
        }
    }
</script>
