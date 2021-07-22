<template>
    <div class="skills">
        <div class="skills__list">
            <CardSkill 
                v-for="(entry, i) in skills || []"
                :key="i"
                :name="entry.name"
                :level="entry.level"
                :options="entry.options"
                class="skills__card"
            />
        </div>
    </div>
</template>

<script>
    import { getSkills } from '@/services/user'
    import { ref } from 'vue'
    import CardSkill from '@/components/Cards/Skill.vue'
    export default {
        components: {
            CardSkill,
        },
        setup() {
            const skills = ref(getSkills())
            return {
                skills
            }
        }
    }
</script>

<style lang="postcss">
  .skills {
    &__list {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 10px 100px;
      justify-content: center;
      align-items: center;
    }
  }
</style>