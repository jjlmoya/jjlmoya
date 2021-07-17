<template>
    <div class="card-job">
        <div class="card-job__inner">
            <div class="card-job__title u-text-bold">
                {{ job.title }}
            </div>
            <div class="card-job__dates">
                <div class="card-job__date-in">
                    <span class="fal fa-portal-enter"></span><span>{{ job.dateIn }}</span>
                </div>
                <div v-if="job.dateOut" class="card-job__date-out">
                    {{ job.dateOut ? `${job.dateOut}` : '(Actualmente)' }}  <span class="fal fa-portal-exit"></span>
                </div>
                <div v-else class="card-job__date-out">
                </div>
            </div>
            <a
                :href="job.web"
                target="_blank"
                class="card-job__image"
            >
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
    margin-top: 20px;
    padding: 10px;
    border: 1px solid black;

    &__image {
      margin-top: 20px;
      border-radius: 50%;
      overflow: hidden;
      align-self: end;
      justify-self: center;
      text-align: center;
    }

    &__inner {
      text-align: center;
      display: grid;
      justify-content: center;
      justify-self: center;
    }

    img {
      object-fit: scale-down;
    }

    &__image,
    img {
      height: 100px;
      width: 100px;
    }

    &__dates {
      padding: 10px;
      display: grid;
      grid-gap: 5px;
    }

    &__date-in,
    &__date-out {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: 10px auto;
      text-align: right;
    }

    &__date-out {
      grid-template-columns: auto 10px;
      text-align: left;
    }
  }
</style>

