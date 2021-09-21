<template>
    <div>
        <HeroBannerFace />
        <CoreSection :title="$t('section.experience')">
            <TimeLine />
        </CoreSection>
        <CoreSection :title="$t('section.skills')">
            <Skills />
        </CoreSection>
    </div>
</template>

<script>
    import TimeLine from '@/components/Timeline.vue'
    import Skills from '@/components/Skills.vue'
    import CoreSection from '@/components/Core/Section.vue'
    import HeroBannerFace from '@/components/Banner/HeroFace.vue'

    export default {
        components: {
            HeroBannerFace,
            CoreSection,
            TimeLine,
            Skills
        },
        setup() {
        
        }
      
    }
</script>

<style lang="postcss">
  /* estilos */
</style>