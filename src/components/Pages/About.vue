<template>
    <div class="page page--header">
        <CoreSection
            :order="instances++"
        >
            <HeroBannerFace />
        </CoreSection>
        <CoreSection
            :order="instances++"
            :title="$t('section.experience')"
        >
            <TimeLine />
        </CoreSection>
        <CoreSection
            :order="instances++"
            :title="$t('section.skills')"
        >
            <Skills />
        </CoreSection>
    </div>
</template>

<script>
    import TimeLine from '@/components/Timeline.vue'
    import Skills from '@/components/Skills.vue'
    import CoreSection from '@/components/Core/Section.vue'
    import HeroBannerFace from '@/components/Banner/HeroFace.vue'
    import { ref } from '@vue/reactivity'

    export default {
        components: {
            HeroBannerFace,
            CoreSection,
            TimeLine,
            Skills
        },
        setup() {
            const instances = 0
            return {
                instances
            }
        }
      
    }
</script>

<style lang="postcss">

</style>