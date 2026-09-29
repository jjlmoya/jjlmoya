import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DybTz3uo.mjs';
import { manifest } from './manifest_DaAThW4e.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image/index.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/oembed.json.astro.mjs');
const _page3 = () => import('./pages/api/search-index.json.astro.mjs');
const _page4 = () => import('./pages/apps/colorbeat.astro.mjs');
const _page5 = () => import('./pages/apps/day-check.astro.mjs');
const _page6 = () => import('./pages/apps/dig-bot.astro.mjs');
const _page7 = () => import('./pages/apps/fast-task.astro.mjs');
const _page8 = () => import('./pages/apps/galleta-de-la-fortuna/descarga.astro.mjs');
const _page9 = () => import('./pages/apps/galleta-de-la-fortuna.astro.mjs');
const _page10 = () => import('./pages/apps/lexi-crash/descarga.astro.mjs');
const _page11 = () => import('./pages/apps/lexi-crash.astro.mjs');
const _page12 = () => import('./pages/apps/monmons.astro.mjs');
const _page13 = () => import('./pages/apps/pizzametrics/download.astro.mjs');
const _page14 = () => import('./pages/apps/pizzametrics.astro.mjs');
const _page15 = () => import('./pages/apps.astro.mjs');
const _page16 = () => import('./pages/charlas.astro.mjs');
const _page17 = () => import('./pages/conceptos/biblioteca.astro.mjs');
const _page18 = () => import('./pages/conceptos/escala-de-grises.astro.mjs');
const _page19 = () => import('./pages/conceptos/espera.astro.mjs');
const _page20 = () => import('./pages/conceptos/huella-digital.astro.mjs');
const _page21 = () => import('./pages/conceptos/inflacion.astro.mjs');
const _page22 = () => import('./pages/conceptos/medicion.astro.mjs');
const _page23 = () => import('./pages/conceptos/oda-al-aburrimiento.astro.mjs');
const _page24 = () => import('./pages/conceptos/trigo.astro.mjs');
const _page25 = () => import('./pages/conceptos.astro.mjs');
const _page26 = () => import('./pages/gamebob/mecanicas/autorunner.astro.mjs');
const _page27 = () => import('./pages/gamebob/mecanicas/bullet-time-painting.astro.mjs');
const _page28 = () => import('./pages/gamebob/mecanicas/clicker.astro.mjs');
const _page29 = () => import('./pages/gamebob/mecanicas/color-chameleon.astro.mjs');
const _page30 = () => import('./pages/gamebob/mecanicas/draw-the-path.astro.mjs');
const _page31 = () => import('./pages/gamebob/mecanicas/echolocation.astro.mjs');
const _page32 = () => import('./pages/gamebob/mecanicas/finger-twister.astro.mjs');
const _page33 = () => import('./pages/gamebob/mecanicas/flocking.astro.mjs');
const _page34 = () => import('./pages/gamebob/mecanicas/gravity-flip.astro.mjs');
const _page35 = () => import('./pages/gamebob/mecanicas/gravity-well.astro.mjs');
const _page36 = () => import('./pages/gamebob/mecanicas/hold-jump.astro.mjs');
const _page37 = () => import('./pages/gamebob/mecanicas/magnetic-finger.astro.mjs');
const _page38 = () => import('./pages/gamebob/mecanicas/momentum-transfer.astro.mjs');
const _page39 = () => import('./pages/gamebob/mecanicas/neon-grapple.astro.mjs');
const _page40 = () => import('./pages/gamebob/mecanicas/one-bullet-shooter.astro.mjs');
const _page41 = () => import('./pages/gamebob/mecanicas/plataformas.astro.mjs');
const _page42 = () => import('./pages/gamebob/mecanicas/rhythm-jump.astro.mjs');
const _page43 = () => import('./pages/gamebob/mecanicas/size-matters.astro.mjs');
const _page44 = () => import('./pages/gamebob/mecanicas/slingshot.astro.mjs');
const _page45 = () => import('./pages/gamebob/mecanicas/swipe.astro.mjs');
const _page46 = () => import('./pages/gamebob/mecanicas/tap-fly.astro.mjs');
const _page47 = () => import('./pages/gamebob/mecanicas/the-barrier.astro.mjs');
const _page48 = () => import('./pages/gamebob/mecanicas/vibrator-cracker.astro.mjs');
const _page49 = () => import('./pages/gamebob/mecanicas/viewport-collision.astro.mjs');
const _page50 = () => import('./pages/gamebob/mecanicas.astro.mjs');
const _page51 = () => import('./pages/gamebob/post-mortem/_id_.astro.mjs');
const _page52 = () => import('./pages/gamebob/post-mortem.astro.mjs');
const _page53 = () => import('./pages/gamebob/privacidad.astro.mjs');
const _page54 = () => import('./pages/gamebob/prototipos/evolucion.astro.mjs');
const _page55 = () => import('./pages/gamebob/prototipos/imperio-deuda.astro.mjs');
const _page56 = () => import('./pages/gamebob/prototipos/scroll-momentum.astro.mjs');
const _page57 = () => import('./pages/gamebob/prototipos.astro.mjs');
const _page58 = () => import('./pages/gamebob/roadmap.astro.mjs');
const _page59 = () => import('./pages/gamebob/terminos-y-condiciones.astro.mjs');
const _page60 = () => import('./pages/gamebob.astro.mjs');
const _page61 = () => import('./pages/proyectos.astro.mjs');
const _page62 = () => import('./pages/utilidades/alcance-telescopio.astro.mjs');
const _page63 = () => import('./pages/utilidades/alivio-tinnitus.astro.mjs');
const _page64 = () => import('./pages/utilidades/baliza-morse.astro.mjs');
const _page65 = () => import('./pages/utilidades/calculadora-agua-lluvia.astro.mjs');
const _page66 = () => import('./pages/utilidades/calculadora-arcilla.astro.mjs');
const _page67 = () => import('./pages/utilidades/calculadora-balustres.astro.mjs');
const _page68 = () => import('./pages/utilidades/calculadora-barriles-fiesta.astro.mjs');
const _page69 = () => import('./pages/utilidades/calculadora-caida-tension.astro.mjs');
const _page70 = () => import('./pages/utilidades/calculadora-calidad-impresion.astro.mjs');
const _page71 = () => import('./pages/utilidades/calculadora-carbonatacion.astro.mjs');
const _page72 = () => import('./pages/utilidades/calculadora-coste-llm.astro.mjs');
const _page73 = () => import('./pages/utilidades/calculadora-coste-reunion.astro.mjs');
const _page74 = () => import('./pages/utilidades/calculadora-edad-mascotas.astro.mjs');
const _page75 = () => import('./pages/utilidades/calculadora-enfriamiento-cerveza.astro.mjs');
const _page76 = () => import('./pages/utilidades/calculadora-espacio-muebles.astro.mjs');
const _page77 = () => import('./pages/utilidades/calculadora-fixie.astro.mjs');
const _page78 = () => import('./pages/utilidades/calculadora-iva-inverso.astro.mjs');
const _page79 = () => import('./pages/utilidades/calculadora-passepartout.astro.mjs');
const _page80 = () => import('./pages/utilidades/calculadora-radios.astro.mjs');
const _page81 = () => import('./pages/utilidades/calculadora-resina.astro.mjs');
const _page82 = () => import('./pages/utilidades/calculadora-siembra.astro.mjs');
const _page83 = () => import('./pages/utilidades/calculadora-solar.astro.mjs');
const _page84 = () => import('./pages/utilidades/calculadora-sueldo-neto.astro.mjs');
const _page85 = () => import('./pages/utilidades/calculadora-timelapse.astro.mjs');
const _page86 = () => import('./pages/utilidades/calculadora-tiro-proyector.astro.mjs');
const _page87 = () => import('./pages/utilidades/clipboard.astro.mjs');
const _page88 = () => import('./pages/utilidades/contador-caracteres.astro.mjs');
const _page89 = () => import('./pages/utilidades/contador-colonias.astro.mjs');
const _page90 = () => import('./pages/utilidades/cron.astro.mjs');
const _page91 = () => import('./pages/utilidades/cronometro-digestion.astro.mjs');
const _page92 = () => import('./pages/utilidades/detector-microondas.astro.mjs');
const _page93 = () => import('./pages/utilidades/diagnostico-platanos.astro.mjs');
const _page94 = () => import('./pages/utilidades/distancia-tv.astro.mjs');
const _page95 = () => import('./pages/utilidades/editor-privacidad.astro.mjs');
const _page96 = () => import('./pages/utilidades/equilibrador-cocteles.astro.mjs');
const _page97 = () => import('./pages/utilidades/estimador-salud-bateria.astro.mjs');
const _page98 = () => import('./pages/utilidades/format-stripper.astro.mjs');
const _page99 = () => import('./pages/utilidades/galleta-fortuna.astro.mjs');
const _page100 = () => import('./pages/utilidades/generador-contrasenas.astro.mjs');
const _page101 = () => import('./pages/utilidades/generador-excusas.astro.mjs');
const _page102 = () => import('./pages/utilidades/generador-mockups-movil.astro.mjs');
const _page103 = () => import('./pages/utilidades/generador-patrones-cuentas.astro.mjs');
const _page104 = () => import('./pages/utilidades/generador-tonos.astro.mjs');
const _page105 = () => import('./pages/utilidades/generador-zalgo.astro.mjs');
const _page106 = () => import('./pages/utilidades/guia-lavado-textil.astro.mjs');
const _page107 = () => import('./pages/utilidades/guia-roux.astro.mjs');
const _page108 = () => import('./pages/utilidades/guia-sartenes.astro.mjs');
const _page109 = () => import('./pages/utilidades/hipoteca.astro.mjs');
const _page110 = () => import('./pages/utilidades/huevos.astro.mjs');
const _page111 = () => import('./pages/utilidades/identificador-fibras-combustion.astro.mjs');
const _page112 = () => import('./pages/utilidades/imc.astro.mjs');
const _page113 = () => import('./pages/utilidades/inflacion.astro.mjs');
const _page114 = () => import('./pages/utilidades/interes-compuesto.astro.mjs');
const _page115 = () => import('./pages/utilidades/json-formatter.astro.mjs');
const _page116 = () => import('./pages/utilidades/keycode.astro.mjs');
const _page117 = () => import('./pages/utilidades/lectura-rapida.astro.mjs');
const _page118 = () => import('./pages/utilidades/lente-cromatica.astro.mjs');
const _page119 = () => import('./pages/utilidades/limpiador-exif.astro.mjs');
const _page120 = () => import('./pages/utilidades/marcador.astro.mjs');
const _page121 = () => import('./pages/utilidades/masa-madre.astro.mjs');
const _page122 = () => import('./pages/utilidades/metronomo.astro.mjs');
const _page123 = () => import('./pages/utilidades/moldes.astro.mjs');
const _page124 = () => import('./pages/utilidades/morteros.astro.mjs');
const _page125 = () => import('./pages/utilidades/optimizador-corte.astro.mjs');
const _page126 = () => import('./pages/utilidades/optimizador-loterias.astro.mjs');
const _page127 = () => import('./pages/utilidades/pintor-sinestesia.astro.mjs');
const _page128 = () => import('./pages/utilidades/pixeles-pantalla.astro.mjs');
const _page129 = () => import('./pages/utilidades/pizza.astro.mjs');
const _page130 = () => import('./pages/utilidades/preparacion-fibras-pigmentar.astro.mjs');
const _page131 = () => import('./pages/utilidades/pronostico-mini-aventuras.astro.mjs');
const _page132 = () => import('./pages/utilidades/protocolo-quimico-manchas.astro.mjs');
const _page133 = () => import('./pages/utilidades/punto-de-rocio.astro.mjs');
const _page134 = () => import('./pages/utilidades/purificador-agua.astro.mjs');
const _page135 = () => import('./pages/utilidades/qr.astro.mjs');
const _page136 = () => import('./pages/utilidades/rastreador-cafeina.astro.mjs');
const _page137 = () => import('./pages/utilidades/reescalador-ingredientes.astro.mjs');
const _page138 = () => import('./pages/utilidades/regla-de-tres.astro.mjs');
const _page139 = () => import('./pages/utilidades/rutas.astro.mjs');
const _page140 = () => import('./pages/utilidades/salmuera.astro.mjs');
const _page141 = () => import('./pages/utilidades/simulador-cielo-oscuro.astro.mjs');
const _page142 = () => import('./pages/utilidades/simulador-daltonismo.astro.mjs');
const _page143 = () => import('./pages/utilidades/simulador-impacto-asteroide.astro.mjs');
const _page144 = () => import('./pages/utilidades/simulador-redes.astro.mjs');
const _page145 = () => import('./pages/utilidades/sincronizar-subtitulos.astro.mjs');
const _page146 = () => import('./pages/utilidades/sorteo.astro.mjs');
const _page147 = () => import('./pages/utilidades/tebas-check/stream.astro.mjs');
const _page148 = () => import('./pages/utilidades/tebas-check.astro.mjs');
const _page149 = () => import('./pages/utilidades/temporizador-cocina.astro.mjs');
const _page150 = () => import('./pages/utilidades/termometro-grillo.astro.mjs');
const _page151 = () => import('./pages/utilidades/test-mando.astro.mjs');
const _page152 = () => import('./pages/utilidades/test-raton.astro.mjs');
const _page153 = () => import('./pages/utilidades/test-reflejos.astro.mjs');
const _page154 = () => import('./pages/utilidades/test-teclado.astro.mjs');
const _page155 = () => import('./pages/utilidades/tipografia-musical.astro.mjs');
const _page156 = () => import('./pages/utilidades/torneo.astro.mjs');
const _page157 = () => import('./pages/utilidades/veracidad-textil.astro.mjs');
const _page158 = () => import('./pages/utilidades/verificador-hash.astro.mjs');
const _page159 = () => import('./pages/utilidades/visualizador-respiracion.astro.mjs');
const _page160 = () => import('./pages/utilidades.astro.mjs');
const _page161 = () => import('./pages/widgets.astro.mjs');
const _page162 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/oembed.json.ts", _page2],
    ["src/pages/api/search-index.json.ts", _page3],
    ["src/pages/apps/colorbeat.astro", _page4],
    ["src/pages/apps/day-check.astro", _page5],
    ["src/pages/apps/dig-bot.astro", _page6],
    ["src/pages/apps/fast-task.astro", _page7],
    ["src/pages/apps/galleta-de-la-fortuna/descarga.astro", _page8],
    ["src/pages/apps/galleta-de-la-fortuna.astro", _page9],
    ["src/pages/apps/lexi-crash/descarga.astro", _page10],
    ["src/pages/apps/lexi-crash.astro", _page11],
    ["src/pages/apps/monmons.astro", _page12],
    ["src/pages/apps/pizzametrics/download.astro", _page13],
    ["src/pages/apps/pizzametrics.astro", _page14],
    ["src/pages/apps/index.astro", _page15],
    ["src/pages/charlas.astro", _page16],
    ["src/pages/conceptos/biblioteca.astro", _page17],
    ["src/pages/conceptos/escala-de-grises.astro", _page18],
    ["src/pages/conceptos/espera.astro", _page19],
    ["src/pages/conceptos/huella-digital.astro", _page20],
    ["src/pages/conceptos/inflacion.astro", _page21],
    ["src/pages/conceptos/medicion.astro", _page22],
    ["src/pages/conceptos/oda-al-aburrimiento.astro", _page23],
    ["src/pages/conceptos/trigo.astro", _page24],
    ["src/pages/conceptos.astro", _page25],
    ["src/pages/gamebob/mecanicas/autorunner.astro", _page26],
    ["src/pages/gamebob/mecanicas/bullet-time-painting.astro", _page27],
    ["src/pages/gamebob/mecanicas/clicker.astro", _page28],
    ["src/pages/gamebob/mecanicas/color-chameleon.astro", _page29],
    ["src/pages/gamebob/mecanicas/draw-the-path.astro", _page30],
    ["src/pages/gamebob/mecanicas/echolocation.astro", _page31],
    ["src/pages/gamebob/mecanicas/finger-twister.astro", _page32],
    ["src/pages/gamebob/mecanicas/flocking.astro", _page33],
    ["src/pages/gamebob/mecanicas/gravity-flip.astro", _page34],
    ["src/pages/gamebob/mecanicas/gravity-well.astro", _page35],
    ["src/pages/gamebob/mecanicas/hold-jump.astro", _page36],
    ["src/pages/gamebob/mecanicas/magnetic-finger.astro", _page37],
    ["src/pages/gamebob/mecanicas/momentum-transfer.astro", _page38],
    ["src/pages/gamebob/mecanicas/neon-grapple.astro", _page39],
    ["src/pages/gamebob/mecanicas/one-bullet-shooter.astro", _page40],
    ["src/pages/gamebob/mecanicas/plataformas.astro", _page41],
    ["src/pages/gamebob/mecanicas/rhythm-jump.astro", _page42],
    ["src/pages/gamebob/mecanicas/size-matters.astro", _page43],
    ["src/pages/gamebob/mecanicas/slingshot.astro", _page44],
    ["src/pages/gamebob/mecanicas/swipe.astro", _page45],
    ["src/pages/gamebob/mecanicas/tap-fly.astro", _page46],
    ["src/pages/gamebob/mecanicas/the-barrier.astro", _page47],
    ["src/pages/gamebob/mecanicas/vibrator-cracker.astro", _page48],
    ["src/pages/gamebob/mecanicas/viewport-collision.astro", _page49],
    ["src/pages/gamebob/mecanicas/index.astro", _page50],
    ["src/pages/gamebob/post-mortem/[id].astro", _page51],
    ["src/pages/gamebob/post-mortem/index.astro", _page52],
    ["src/pages/gamebob/privacidad.astro", _page53],
    ["src/pages/gamebob/prototipos/evolucion.astro", _page54],
    ["src/pages/gamebob/prototipos/imperio-deuda.astro", _page55],
    ["src/pages/gamebob/prototipos/scroll-momentum.astro", _page56],
    ["src/pages/gamebob/prototipos/index.astro", _page57],
    ["src/pages/gamebob/roadmap.astro", _page58],
    ["src/pages/gamebob/terminos-y-condiciones.astro", _page59],
    ["src/pages/gamebob.astro", _page60],
    ["src/pages/proyectos.astro", _page61],
    ["src/pages/utilidades/alcance-telescopio.astro", _page62],
    ["src/pages/utilidades/alivio-tinnitus.astro", _page63],
    ["src/pages/utilidades/baliza-morse.astro", _page64],
    ["src/pages/utilidades/calculadora-agua-lluvia.astro", _page65],
    ["src/pages/utilidades/calculadora-arcilla.astro", _page66],
    ["src/pages/utilidades/calculadora-balustres.astro", _page67],
    ["src/pages/utilidades/calculadora-barriles-fiesta.astro", _page68],
    ["src/pages/utilidades/calculadora-caida-tension.astro", _page69],
    ["src/pages/utilidades/calculadora-calidad-impresion.astro", _page70],
    ["src/pages/utilidades/calculadora-carbonatacion.astro", _page71],
    ["src/pages/utilidades/calculadora-coste-llm.astro", _page72],
    ["src/pages/utilidades/calculadora-coste-reunion.astro", _page73],
    ["src/pages/utilidades/calculadora-edad-mascotas.astro", _page74],
    ["src/pages/utilidades/calculadora-enfriamiento-cerveza.astro", _page75],
    ["src/pages/utilidades/calculadora-espacio-muebles.astro", _page76],
    ["src/pages/utilidades/calculadora-fixie.astro", _page77],
    ["src/pages/utilidades/calculadora-iva-inverso.astro", _page78],
    ["src/pages/utilidades/calculadora-passepartout.astro", _page79],
    ["src/pages/utilidades/calculadora-radios.astro", _page80],
    ["src/pages/utilidades/calculadora-resina.astro", _page81],
    ["src/pages/utilidades/calculadora-siembra.astro", _page82],
    ["src/pages/utilidades/calculadora-solar.astro", _page83],
    ["src/pages/utilidades/calculadora-sueldo-neto.astro", _page84],
    ["src/pages/utilidades/calculadora-timelapse.astro", _page85],
    ["src/pages/utilidades/calculadora-tiro-proyector.astro", _page86],
    ["src/pages/utilidades/clipboard.astro", _page87],
    ["src/pages/utilidades/contador-caracteres.astro", _page88],
    ["src/pages/utilidades/contador-colonias.astro", _page89],
    ["src/pages/utilidades/cron.astro", _page90],
    ["src/pages/utilidades/cronometro-digestion.astro", _page91],
    ["src/pages/utilidades/detector-microondas.astro", _page92],
    ["src/pages/utilidades/diagnostico-platanos.astro", _page93],
    ["src/pages/utilidades/distancia-tv.astro", _page94],
    ["src/pages/utilidades/editor-privacidad.astro", _page95],
    ["src/pages/utilidades/equilibrador-cocteles.astro", _page96],
    ["src/pages/utilidades/estimador-salud-bateria.astro", _page97],
    ["src/pages/utilidades/format-stripper.astro", _page98],
    ["src/pages/utilidades/galleta-fortuna.astro", _page99],
    ["src/pages/utilidades/generador-contrasenas.astro", _page100],
    ["src/pages/utilidades/generador-excusas.astro", _page101],
    ["src/pages/utilidades/generador-mockups-movil.astro", _page102],
    ["src/pages/utilidades/generador-patrones-cuentas.astro", _page103],
    ["src/pages/utilidades/generador-tonos.astro", _page104],
    ["src/pages/utilidades/generador-zalgo.astro", _page105],
    ["src/pages/utilidades/guia-lavado-textil.astro", _page106],
    ["src/pages/utilidades/guia-roux.astro", _page107],
    ["src/pages/utilidades/guia-sartenes.astro", _page108],
    ["src/pages/utilidades/hipoteca.astro", _page109],
    ["src/pages/utilidades/huevos.astro", _page110],
    ["src/pages/utilidades/identificador-fibras-combustion.astro", _page111],
    ["src/pages/utilidades/imc.astro", _page112],
    ["src/pages/utilidades/inflacion.astro", _page113],
    ["src/pages/utilidades/interes-compuesto.astro", _page114],
    ["src/pages/utilidades/json-formatter.astro", _page115],
    ["src/pages/utilidades/keycode.astro", _page116],
    ["src/pages/utilidades/lectura-rapida.astro", _page117],
    ["src/pages/utilidades/lente-cromatica.astro", _page118],
    ["src/pages/utilidades/limpiador-exif.astro", _page119],
    ["src/pages/utilidades/marcador.astro", _page120],
    ["src/pages/utilidades/masa-madre.astro", _page121],
    ["src/pages/utilidades/metronomo.astro", _page122],
    ["src/pages/utilidades/moldes.astro", _page123],
    ["src/pages/utilidades/morteros.astro", _page124],
    ["src/pages/utilidades/optimizador-corte.astro", _page125],
    ["src/pages/utilidades/optimizador-loterias.astro", _page126],
    ["src/pages/utilidades/pintor-sinestesia.astro", _page127],
    ["src/pages/utilidades/pixeles-pantalla.astro", _page128],
    ["src/pages/utilidades/pizza.astro", _page129],
    ["src/pages/utilidades/preparacion-fibras-pigmentar.astro", _page130],
    ["src/pages/utilidades/pronostico-mini-aventuras.astro", _page131],
    ["src/pages/utilidades/protocolo-quimico-manchas.astro", _page132],
    ["src/pages/utilidades/punto-de-rocio.astro", _page133],
    ["src/pages/utilidades/purificador-agua.astro", _page134],
    ["src/pages/utilidades/qr.astro", _page135],
    ["src/pages/utilidades/rastreador-cafeina.astro", _page136],
    ["src/pages/utilidades/reescalador-ingredientes.astro", _page137],
    ["src/pages/utilidades/regla-de-tres.astro", _page138],
    ["src/pages/utilidades/rutas.astro", _page139],
    ["src/pages/utilidades/salmuera.astro", _page140],
    ["src/pages/utilidades/simulador-cielo-oscuro.astro", _page141],
    ["src/pages/utilidades/simulador-daltonismo.astro", _page142],
    ["src/pages/utilidades/simulador-impacto-asteroide.astro", _page143],
    ["src/pages/utilidades/simulador-redes.astro", _page144],
    ["src/pages/utilidades/sincronizar-subtitulos.astro", _page145],
    ["src/pages/utilidades/sorteo.astro", _page146],
    ["src/pages/utilidades/tebas-check/stream.astro", _page147],
    ["src/pages/utilidades/tebas-check.astro", _page148],
    ["src/pages/utilidades/temporizador-cocina.astro", _page149],
    ["src/pages/utilidades/termometro-grillo.astro", _page150],
    ["src/pages/utilidades/test-mando.astro", _page151],
    ["src/pages/utilidades/test-raton.astro", _page152],
    ["src/pages/utilidades/test-reflejos.astro", _page153],
    ["src/pages/utilidades/test-teclado.astro", _page154],
    ["src/pages/utilidades/tipografia-musical.astro", _page155],
    ["src/pages/utilidades/torneo.astro", _page156],
    ["src/pages/utilidades/veracidad-textil.astro", _page157],
    ["src/pages/utilidades/verificador-hash.astro", _page158],
    ["src/pages/utilidades/visualizador-respiracion.astro", _page159],
    ["src/pages/utilidades/index.astro", _page160],
    ["src/pages/widgets/index.astro", _page161],
    ["src/pages/index.astro", _page162]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "4e875308-fb29-4a4b-adf9-aa130a0c538e",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
