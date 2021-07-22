<template>
    <div class="card-job">
        <div
            target="_blank"
            class="card-job__content"
        >
            <div class="card-job__wrapper ">
                <div class="card-job__date-in">
                    <span class="fas fa-arrow-right"></span> <span>{{ job.dateIn }}</span>
                </div>
                <div class="card-job__title u-text-bold">
                    {{ job.title }}
                </div>
                <div v-if="job.dateOut" class="card-job__date-out">
                    {{ job.dateOut ? `${job.dateOut}` : '(Actualmente)' }}  <span class="fas fa-arrow-right card-job__icon"></span>
                </div>
                <div v-else class="card-job__date-out">
                </div>
            </div>
            <img :alt="job.company" :src="job.logo">
           
            <!--
            
            -->
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            job: {
                type: Object,
                default: () => ({})
            },
        },
        setup () {
          
        }
        
    }
</script>

<style lang="postcss">
  .card-job {
    padding: 10px;
    display: grid;
    grid-gap: 20px;

    &__content {
      position: relative;
      overflow: hidden;
      justify-self: center;
      height: 300px;
      width: 300px;

      img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__title {
      font-size: em(32px);
    }

    &__wrapper {
      position: absolute;
      z-index: 2;
      padding: 10px 0;
      background-color: var(--color-black);
      display: grid;
      grid-template-rows: auto 1fr auto;
      align-items: center;
      color: white;
      height: 100%;
      width: 100%;
      top: 0;
      opacity: 0.7;
      line-height: 0.9;
      text-align: center;
    }

    &__date-in,
    &__date-out {
      width: 100%;
      text-align: left;
      font-size: em(16px);
      display: grid;
      grid-template-columns: auto auto 1fr;
      align-items: center;
      grid-gap: 10px;
    }

    &__date-out {
      text-align: right;
      grid-template-columns: 1fr auto auto;
      grid-gap: 0;
    }

    &__icon {
      padding-left: 10px;
    }
  }
</style>

