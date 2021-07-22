<template>
    <div>
        <CoreSection title="Experiencia Personal">
            <TimeLine />
        </CoreSection>
        <CoreSection title="Habilidades">
            <Skills />
        </CoreSection>
    </div>
</template>

<script>
    import TimeLine from '@/components/Timeline.vue'
    import Skills from '@/components/Skills.vue'
    import CoreSection from '@/components/Core/Section.vue'

    export default {
        components: {
            CoreSection,
            TimeLine,
            Skills
        }
      
    }
</script>

<style lang="postcss">
  /* estilos */
</style>