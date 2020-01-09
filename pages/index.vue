<template>
    <div class="home" :class="theme">
        <Layout>
            Hola
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
