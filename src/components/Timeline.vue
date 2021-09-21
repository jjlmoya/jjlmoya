<template>
    <div ref="time" class="timeline">
        <div class="timeline__list">
            <CardJob 
                v-for="(entry, i) in timeline || []"
                :key="i"
                :job="entry"
                class="timeline__card"
            />
        </div>
    </div>
</template>

<script>
    import { getTimeline } from '@/services/user'
    import { ref, onMounted } from 'vue'
    import CardJob from '@/components/Cards/Job.vue'
    export default {
        components: {
            CardJob,
        },
        setup() {
            const timeline = ref(getTimeline())
            const time = ref(null)

            onMounted(() => {
                time.value.style.setProperty('--total', timeline.value.length)
            })

            return {
                timeline,
                time
            }
        }
    }
</script>

<style lang="postcss">
  .timeline {
    &__title {
      padding: 0 20px;
      font-size: var(--font-size-h3);
    }

    &__list {
      display: grid;
      grid-gap: calc(var(--gap-container) / 2);
      grid-template-columns: 10px repeat(var(--total), 300px) 10px;
      grid-template-rows: minmax(0, 1fr);
      overflow-x: scroll;
      overflow-y: inherit;
      scroll-snap-type: x proximity;
      margin-bottom: calc(-0.25 * var(--gap-container));

      &::before {
        content: '';
      }
    }

    &__card {
      img {
        object-fit: cover;
      }
    }
  }
</style>