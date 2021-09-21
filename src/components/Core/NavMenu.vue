<template>
    <div class="nav-menu">
        <div
            v-for="(path, i) in paths"
            :key="path.name"
            class="nav-menu__item"
            :class="{'nav-menu__item--active': path.path === $route.path}"
            @click="$router.push({ name: path.name })"
        >
            {{ $t(`router.${path.name}`) }}
        </div>
    </div>
</template>

<script>
    import useCustomRouter from '@/use/customRouter'

    export default {
        setup() {
            const { getNavPath } = useCustomRouter()

            return {
                paths: getNavPath()
            }
        }
     
    }
</script>

<style lang="postcss">
  .nav-menu {
    display: grid;
    grid-auto-flow: column;
    grid-gap: em(16px);

    &__item {
      font-weight: bold;
      text-transform: uppercase;
      opacity: 0.5;
      cursor: pointer;

      &--active {
        font-weight: 900;
        opacity: 1;
      }
    }
  }
</style>