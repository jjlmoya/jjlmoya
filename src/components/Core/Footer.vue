<template>
    <div class="footer">
        <div class="footer__content">
            <div class="footer__text">
                <div class="footer__icons">
                    <span 
                        v-for="entry in [
                            'fa fa-envelope',
                            'fab fa-facebook', 
                            'fab fa-linkedin',
                            'fab fa-instagram',
                            'fab fa-whatsapp'
                        ]" 
                        :key="entry" 
                        class="footer__icon"
                        :class="entry"
                    >
                    </span>
                </div>
                <div class="footer__legal">
                    <span class="footer__legal-title">Enlaces a las políticas de:</span>
                    <a class="footer__link" href="">
                        Privacidad
                    </a>
                    <a class="footer__link" href="">
                        Cookies
                    </a>
                </div>

                <div class="footer__copyright">
                    Copyright © 2021 JJLMOYA
                </div>
            </div>
        </div>
        <div class="footer__wrapper">
            <Asterik 
                class="footer__asterisk"
                secondary
            />
        </div>
    </div>
</template>

<script>
    import Asterik from '@/components/Core/Asterisk.vue'

    export default {
        components: {
            Asterik
        },
    
    }
</script>

<style lang="postcss">
  .footer {
    position: relative;
    color: var(--color-primary-inside);

    &__content {
      margin-top: em(40px);
      height: em(280px);
      background-color: var(--color-text);
      display: grid;
      justify-content: center;
      align-items: end;
      padding: em(16px);
    }

    &__asterisk {
      width: em(90px);
      margin: 0 auto;
    }

    &__wrapper {
      position: absolute;
      top: em(-40px);
      width: 100%;
      justify-content: center;
    }

    &__icon {
      font-size: em(24px);
    }

    &__icons {
      display: grid;
      grid-auto-flow: column;
      grid-gap: em(4px);
    }

    &__legal {
      text-align: center;
      font-size: var(--font-size-small);
      display: grid;
      grid-gap: em(8px);

      &-title {
        font-weight: bold;
      }
    }

    &__text {
      text-align: center;
      display: grid;
      grid-gap: em(16px);
    }

    &__link {
      text-decoration: underline;
    }

    &__copyright {
      font-size: var(--font-size-accent);
      opacity: 0.6;
    }
  }
</style>