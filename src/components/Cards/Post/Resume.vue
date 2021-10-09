<template>
    <div
        class="post-resume" 
        :class="{'post-resume--reverse' : index % 2 !== 0}"
    >
        <div class="post-resume__image">
            <img :src="image" :alt="title">
        </div>
        <div class="post-resume__content">
            <div class="post-resume__heading">
                <div class="post-resume__title">
                    <h3>{{ title }}</h3>
                </div>
                <div class="post-resume__date">
                    {{ fullDate(date).day }} {{ $t('date.month.' + fullDate(date).month) }}  {{ fullDate(date).year }}
                </div>
            </div>
            <div class="post-resume__body">
                {{ description }}
            </div>
            <div class="post-resume__button">
                <CoreButton :cta="$t('button.read')" secondary ghost />
            </div>
        </div>
    </div>
</template>

<script>
    import CoreButton from '@/components/Core/Button.vue'
    import useDate from '@/use/useDate'
    
    export default {
        components: {
            CoreButton,
        },
        props: {
            title: {
                type: String,
                default:  'Artículo 1-3'
            },
            image: {
                type: String,
                default: 'https://i.shgcdn.com/94287d60-1ef1-455b-bd30-b6c474fd057a/-/format/auto/-/stretch/off/-/resize/3000x/-/quality/lighter/'
            },
            description: {
                type: String,
                default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis mi sit amet sem tristique posuere sit amet eget neque. Donec fermentum nibh vel dui blandit, in interdum ante faucibus. Ut vitae pharetra nunc. Phasellus eu nisl mi. .. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis mi sit amet sem tristique posuere sit amet eget neque. Donec fermentum nibh vel dui blandit, in interdum ante faucibus. Ut vitae pharetra nunc. Phasellus eu nisl mi. ..'
            },
            date: {
                type: Date,
                default: new Date()
            },
            index: {
                type: Number,
                default: 0
            }
        },
        setup() {
            const { fullDate } = useDate()

            return {
                fullDate
            }
        }
    }
</script>

<style lang="postcss">
  .post-resume {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 50%;
    margin: 0 auto;

    &__image {
      width: 100%;
      justify-self: end;

      img {
        object-fit: cover;
      }
    }

    &__content {
      z-index: 1;
      display: grid;
      text-align: right;
      margin-left: em(-50px);
      grid-gap: em(16px);
      align-items: center;
    }

    &__title {
      font-size: var(--font-size-h2);
    }

    &__date {
      font-size: var(--font-size-small);
    }

    &__body {
      background-color: var(--color-primary);
      color: var(--color-primary-inside);
      padding: em(16px);
      border-radius: 5px;
      text-align: left;
    }

    &--reverse {
      .post-resume {
        &__content {
          order: 0;
          margin-right: em(-50px);
          text-align: left;
        }

        &__image {
          order: 1;
        }
      }
    }
  }
</style>