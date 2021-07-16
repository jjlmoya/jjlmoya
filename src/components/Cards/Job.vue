<template>
    <div class="card-job">
        <div class="card-job__inner">
            <div class="card-job__title u-text-bold">
                {{ job.title }}
            </div>
            <div class="card-job__dates">
                <div class="card-job__date-in">
                    <span class="fal fa-portal-enter"></span>{{ job.dateIn }}
                </div>
                <div v-if="job.dateOut" class="card-job__date-out">
                    {{ job.dateOut ? `${job.dateOut}` : '(Actualmente)' }}  <span class="fal fa-portal-exit"></span>
                </div>
                <div v-else class="card-job__date-out">
                    <span class="fal fa-person-sign"></span> 
                </div>
            </div>
            <a :href="job.web" target="_blank" class="card-job__image">
                <img :src="job.logo">
            </a>
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
    margin-top: 100px;

    &__image {
      margin-top: 20px;
      margin-bottom: -65px;
      border-radius: 50%;
      overflow: hidden;
      align-self: end;
      justify-self: center;
      text-align: center;
    }

    &__inner {
      text-align: center;
      display: grid;
      margin: 20px;
      justify-content: center;
      justify-self: center;
      z-index: 3;
    }

    img {
      object-fit: cover;
    }

    &__image,
    img {
      height: 100px;
      width: 100px;
    }

    &__dates {
      padding: 5px;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    &__date-in {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    &__date-out {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
</style>

