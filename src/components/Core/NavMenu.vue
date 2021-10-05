<template>
    <div class="nav-menu">
        <div
            v-for="path in paths"
            :key="path.name"
            class="nav-menu__item"
            :class="{'nav-menu__item--active': path.path === $route.path}"
            @click="$router.push({ name: path.name })"
        >
            {{ $t(`router.${path.name}`) }}
            <div class="nav-menu__wrapper">
                <Asterik 
                    v-if="path.path === $route.path"
                    class="nav-menu__asterisk"
                    secondary
                />
            </div>
        </div>
    </div>
</template>

<script>
    import useCustomRouter from '@/use/customRouter'
    import Asterik from '@/components/Core/Asterisk.vue'
    export default {
        components: {
            Asterik,
        },
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
      cursor: pointer;
      font-size: var(--font-size-h3);

      &--active {
        position: relative;
        opacity: 1;
        color: var(--color-secondary-lighter);
      }
    }

    &__wrapper {
      position: absolute;
      display: grid;
      justify-content: center;
      width: 100%;
    }

    &__asterisk {
      width: em(12px);
    }
  }
</style>