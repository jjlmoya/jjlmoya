export interface NuanceSlideData {
    id: string;
    labelLeft: string;
    labelRight: string;
    badge: string;
    title: string;
    desc: string;
    leftTitle: string;
    leftDesc: string;
    rightTitle: string;
    rightDesc: string;
}

export const NUANCE_SLIDES: NuanceSlideData[] = [
    {
        id: "feminismo",
        labelLeft: "HEMBRISMO",
        labelRight: "MACHISMO",
        badge: "Igualdad",
        title: "GÉNERO",
        desc: "Reconocer las diferencias biológicas no justifica la desigualdad de derechos. Negarlas por completo ignora la realidad material. La igualdad es legal y moral, no biológica.",
        leftTitle: "TODOS SON<br />CULPABLES",
        leftDesc: "LA MASCULINIDAD ES UN CÁNCER.",
        rightTitle: "VUELVE A LA<br />COCINA",
        rightDesc: "EL ORDEN NATURAL ES SAGRADO."
    },
    {
        id: "redes",
        labelLeft: "TÓXICO",
        labelRight: "CONEXIÓN PURA",
        badge: "Social",
        title: "ALGORITMO",
        desc: "Las redes pueden amplificar voces marginadas y democratizar el conocimiento, pero su modelo de negocio actual monetiza la polarización y la ansiedad.",
        leftTitle: "BÓRRALO<br />TODO",
        leftDesc: "VIVIMOS EN UNA SIMULACIÓN DE EGO.",
        rightTitle: "POSTEA<br />TU ALMA",
        rightDesc: "SI NO LO COMPARTES, NO EXISTES."
    },
    {
        id: "clima",
        labelLeft: "COLAPSO INEVITABLE",
        labelRight: "NEGACIONISMO",
        badge: "Planeta",
        title: "ECO-LÓGICA",
        desc: "El pánico paraliza y la negación condena. Necesitamos innovación tecnológica agresiva y decrecimiento selectivo, no volver a las cavernas ni fingir que no pasa nada.",
        leftTitle: "EXTRACCIÓN<br />ES ASESINATO",
        leftDesc: "EL SER HUMANO ES LA PLAGA.",
        rightTitle: "EL CLIMA<br />SIEMPRE CAMBIA",
        rightDesc: "LA ECONOMÍA NO SE TOCA."
    },
    {
        id: "exito",
        labelLeft: "MEDIOCRIDAD",
        labelRight: "WORKAHOLIC",
        badge: "Vida",
        title: "ÉXITO",
        desc: "El éxito no es solo dinero ni fama, es vivir con propósito. Pero ignorar la necesidad de recursos materiales en una sociedad capitalista es ingenuidad, no virtud.",
        leftTitle: "CONFÓRMATE",
        leftDesc: "LA AMBICIÓN ES DE PSICÓPATAS.",
        rightTitle: "NO DUERMAS<br />NUNCA",
        rightDesc: "EL DESCANSO ES PARA LOS DÉBILES."
    },
    {
        id: "dieta",
        labelLeft: "VEGANISMO MILITANTE",
        labelRight: "CARNIVORISMO PURO",
        badge: "Nutrición",
        title: "NUTRICIÓN CULTURAL",
        desc: "Comer es un acto ético y biológico. Podemos reducir el sufrimiento animal sin negar nuestra historia evolutiva omnívora. No hay una dieta santa.",
        leftTitle: "COMES<br />CADÁVERES",
        leftDesc: "ERES UN ASESINO ESPECISTA.",
        rightTitle: "SOYBOY<br />DÉBIL",
        rightDesc: "SOLO LA SANGRE DA FUERZA."
    },
    {
        id: "dios",
        labelLeft: "ATEÍSMO RADICAL",
        labelRight: "FANATISMO",
        badge: "Espiritualidad",
        title: "FE Y RAZÓN",
        desc: "La ciencia explica el cómo, la espiritualidad busca el porqué. Podemos abrazar el método científico sin perder el asombro ante el misterio de la existencia.",
        leftTitle: "DIOS HA<br />MUERTO",
        leftDesc: "SOMOS BOLSAS DE CARNE ALEATORIA.",
        rightTitle: "DIEZMA O<br />ARDE",
        rightDesc: "LA DUDA ES UN PECADO MORTAL."
    },
    {
        id: "crypto",
        labelLeft: "PONZI TOTAL",
        labelRight: "NUEVO ORDEN",
        badge: "Dinero",
        title: "VALOR DIGITAL",
        desc: "Blockchain es una tecnología revolucionaria llena de estafadores. Los bancos centrales nos roban con inflación, pero la descentralización total es una jungla.",
        leftTitle: "ESQUEMA<br />PIRAMIDAL",
        leftDesc: "TODO ES HUMO Y LAVADO DE DINERO.",
        rightTitle: "HODL<br />HASTA MORIR",
        rightDesc: "EL FIAT VA A CERO MAÑANA."
    },
    {
        id: "patria",
        labelLeft: "XENOFOBIA",
        labelRight: "APÁTRIDA",
        badge: "Pertenencia",
        title: "IDENTIDAD NACIONAL",
        desc: "Amar tu cultura no implica odiar la del vecino. Ser ciudadano del mundo es un privilegio vacío si no cuidas tu comunidad local primero.",
        leftTitle: "CIERRA<br />FRONTERAS",
        leftDesc: "PRIMERO LOS DE CASA.",
        rightTitle: "LAS NACIONES<br />SON CÁRCELES",
        rightDesc: "NINGÚN SER HUMANO ES ILEGAL."
    },
    {
        id: "amor",
        labelLeft: "POLIAMOR CAÓTICO",
        labelRight: "POSESIÓN",
        badge: "Relaciones",
        title: "VÍNCULO",
        desc: "La libertad individual no debería impedir el compromiso profundo. Amar es renunciar a la posibilidad de otros mundos para construir uno compartido y sólido.",
        leftTitle: "NADA ES<br />DE NADIE",
        leftDesc: "EL COMPROMISO ES UNA CÁRCEL.",
        rightTitle: "ERES DE<br />MI PROPIEDAD",
        rightDesc: "CELOS ES AMOR."
    },
    {
        id: "vivienda",
        labelLeft: "OKUPACIÓN",
        labelRight: "ESPECULACIÓN",
        badge: "Hogar",
        title: "TECHO DIGNO",
        desc: "La vivienda es un derecho, no solo un activo financiero. Pero la seguridad jurídica y la inversión privada son necesarias para construir ese derecho.",
        leftTitle: "EXPROPIASE<br />TODO",
        leftDesc: "LOS CASEROS SON PARÁSITOS.",
        rightTitle: "EL MERCADO<br />SE REGULA",
        rightDesc: "SI ERES POBRE ES TU CULPA."
    },
    {
        id: "arte",
        labelLeft: "SNOBISMO",
        labelRight: "AUTOMATIZACIÓN",
        badge: "Creatividad",
        title: "ALMA SINTÉTICA",
        desc: "El arte no es solo el resultado, es el proceso humano de dar sentido. La IA democratiza la técnica, pero nunca podrá democratizar el dolor ni la experiencia.",
        leftTitle: "ESO NO ES<br />ARTE",
        leftDesc: "SOLO EL ÓLEO TIENE ALMA.",
        rightTitle: "ADÁPTATE<br />O MUERE",
        rightDesc: "EL ARTISTA ES PRESCINDIBLE."
    },
    {
        id: "educacion",
        labelLeft: "ADOCTRINAMIENTO",
        labelRight: "SALVAJISMO",
        badge: "Educación",
        title: "APRENDIZAJE",
        desc: "La escuela debe enseñar a pensar, no qué pensar. Pero el conocimiento estructurado y compartido es la base de la civilización, no una opresión.",
        leftTitle: "FÁBRICA DE<br />LADRILLOS",
        leftDesc: "MATAN TU CREATIVIDAD.",
        rightTitle: "IGNORANCIA<br />LIBRE",
        rightDesc: "MI HIJO APRENDE MIRANDO TIKTOK."
    },
    {
        id: "seguridad",
        labelLeft: "ESTADO POLICIAL",
        labelRight: "ANARQUÍA",
        badge: "Seguridad",
        title: "CONVIVENCIA",
        desc: "Queremos caminar tranquilos por la calle, pero no a costa de vivir vigilados las 24 horas. La seguridad real nace de la cohesión social, no de las cámaras.",
        leftTitle: "CÁMARAS EN<br />EL BAÑO",
        leftDesc: "EL QUE NADA DEBE NADA TEME.",
        rightTitle: "LEY DEL<br />MÁS FUERTE",
        rightDesc: "COMPRATE UN ARMA O MUERE."
    },
    {
        id: "drogas",
        labelLeft: "PROHIBICIONISMO",
        labelRight: "NARCOESTADO",
        badge: "Salud Pública",
        title: "ALTER EGO",
        desc: "La guerra contra las drogas ha fracasado, pero el consumo sin control destruye vidas. Necesitamos educación, regulación y responsabilidad, no moralismo ni caos.",
        leftTitle: "TU CUERPO<br />ES DEL ESTADO",
        leftDesc: "DI NO A LA VIDA.",
        rightTitle: "ZOMBIES<br />EN LA CALLE",
        rightDesc: "TODO VALE SI COLOCA."
    },
    {
        id: "natalidad",
        labelLeft: "ANTINATALISMO",
        labelRight: "INCUBADORA",
        badge: "Familia",
        title: "LEGADO",
        desc: "Traer hijos al mundo es un acto de esperanza radical, no un deber patriótico ni un crimen ecológico. La crianza consciente es el mayor aporte al futuro.",
        leftTitle: "LA VIDA ES<br />SUFRIMIENTO",
        leftDesc: "EXTINCIÓN VOLUNTARIA YA.",
        rightTitle: "PARE O<br />MUERE",
        rightDesc: "LAS MUJERES SON FÁBRICAS."
    },
    {
        id: "privacidad",
        labelLeft: "TRANSPARENCIA",
        labelRight: "FANTASMA",
        badge: "Datos",
        title: "INTIMIDAD",
        desc: "La privacidad es necesaria para la libertad. Pero el anonimato total también protege crímenes atroces. ¿Dónde está el límite entre seguridad y derecho al secreto?",
        leftTitle: "EL SECRETO<br />ES CULPA",
        leftDesc: "PUBLICA TODO TU CHAT.",
        rightTitle: "DARK<br />WEB",
        rightDesc: "IMPUNIDAD CRIPTOGRÁFICA."
    },
    {
        id: "medicina",
        labelLeft: "BIG PHARMA",
        labelRight: "PSEUDOCIENCIA",
        badge: "Salud",
        title: "SANACIÓN",
        desc: "La medicina moderna salva vidas, pero no siempre cura el alma ni previene la enfermedad. Escuchar al cuerpo no significa negar los antibióticos.",
        leftTitle: "PASTILLA<br />PARA TODO",
        leftDesc: "TU DOLOR ES UN MERCADO.",
        rightTitle: "EL CÁNCER<br />ES MENTAL",
        rightDesc: "VIBRAS ALTAS Y AGUA CON AZÚCAR."
    },
    {
        id: "vejez",
        labelLeft: "GERONTOCRACIA",
        labelRight: "EDADISMO",
        badge: "Tiempo",
        title: "MADUREZ",
        desc: "Envejecer es un privilegio, no una enfermedad. Debemos cuidar a quienes nos cuidaron sin hipotecar el futuro de los jóvenes.",
        leftTitle: "INMORTALIDAD<br />A TODA COSTA",
        leftDesc: "LOS JÓVENES NO SABEN NADA.",
        rightTitle: "SOBRAS<br />ABUELO",
        rightDesc: "LOGAN'S RUN ERA UN DOCUMENTAL."
    },
    {
        id: "trabajo-ia",
        labelLeft: "RENTA BÁSICA",
        labelRight: "LUDISMO",
        badge: "Futuro",
        title: "PROPÓSITO",
        desc: "Si las máquinas trabajan, ¿qué hacemos nosotros? El trabajo dignifica, pero la explotación no. Necesitamos redefinir el valor humano más allá de la productividad.",
        leftTitle: "DINERO<br />GRATIS",
        leftDesc: "NADIE DEBERÍA TRABAJAR JAMÁS.",
        rightTitle: "QUEMA LAS<br />MÁQUINAS",
        rightDesc: "LA TECNOLOGÍA ES EL DEMONIO."
    },
    {
        id: "belleza",
        labelLeft: "BISTURÍ",
        labelRight: "ABANDONO",
        badge: "Estética",
        title: "AUTOESTIMA",
        desc: "Querer verse bien es humano, odiarse a uno mismo es rentable. La salud debe ser el estándar, pero la belleza diversa es la realidad.",
        leftTitle: "FILTRO<br />PERMANENTE",
        leftDesc: "TU CARA REAL ES UN DEFECTO.",
        rightTitle: "OBESIDAD<br />ES SALUD",
        rightDesc: "NEGAR LA BIOLOGÍA ES EMPODERANTE."
    },
    {
        id: "politica",
        labelLeft: "DICTADURA",
        labelRight: "OCRACIA",
        badge: "Poder",
        title: "GOBIERNO",
        desc: "El líder fuerte promete orden pero trae tiranía. La masa promete voz pero trae caos. Las instituciones aburridas son lo único que nos protege de nosotros mismos.",
        leftTitle: "MANO DURA",
        leftDesc: "LA LIBERTAD ESTÁ SOBREVALORADA.",
        rightTitle: "QUEMAD EL<br />CONGRESO",
        rightDesc: "EL PUEBLO SIEMPRE TIENE RAZÓN."
    },
    {
        id: "justicia",
        labelLeft: "PENA DE MUERTE",
        labelRight: "IMPUNIDAD",
        badge: "Justicia",
        title: "REPARACIÓN",
        desc: "El ojo por ojo nos deja ciegos, pero ignorar a las víctimas crea monstruos. La reinserción es el ideal, pero la protección de la sociedad es el deber.",
        leftTitle: "MÁTALOS<br />A TODOS",
        leftDesc: "LA VENGANZA ES DULCE.",
        rightTitle: "ABOLIR<br />PRISIONES",
        rightDesc: "NINGÚN CRIMEN MERECE CASTIGO."
    },
    {
        id: "historia",
        labelLeft: "LEYENDA NEGRA",
        labelRight: "LEYENDA ROSA",
        badge: "Memoria",
        title: "PASADO",
        desc: "No podemos juzgar el siglo XV con la moral del XXI, ni blanquear genocidios. La historia no es un cuento de héroes y villanos, es una lección de complejidad.",
        leftTitle: "TODO FUE<br />GENOCIDIO",
        leftDesc: "TU CULTURA ES CULPABLE.",
        rightTitle: "GLORIOSO<br />IMPERIO",
        rightDesc: "NUNCA HICIMOS NADA MAL."
    },
    {
        id: "ciencia",
        labelLeft: "RELIGIÓN CIENTÍFICA",
        labelRight: "CONSPIRACIÓN",
        badge: "Verdad",
        title: "EVIDENCIA",
        desc: "La ciencia es un método para reducir el error, no un dogma inmutable. Cuestionar es sano, pero negar la realidad observable es caer en el abismo del delirio.",
        leftTitle: "EL EXPERTO<br />ES DIOS",
        leftDesc: "NO PIENSES, CONFÍA.",
        rightTitle: "LA TIERRA<br />ES PLANA",
        rightDesc: "TODO ESTÁ MANIPULADO."
    },
    {
        id: "animales",
        labelLeft: "PERRHIJOS",
        labelRight: "COSIFICACIÓN",
        badge: "Naturaleza",
        title: "ESPECIES",
        desc: "Los animales sienten y merecen respeto, pero humanizarlos es otra forma de maltrato. Amarlos es entender su naturaleza, no disfrazarlos de bebés.",
        leftTitle: "MÁS QUE<br />HUMANOS",
        leftDesc: "SALVA AL PERRO, MATA AL NIÑO.",
        rightTitle: "SON SOLO<br />COSAS",
        rightDesc: "ÚSALOS Y TÍRALOS."
    },
    {
        id: "moda",
        labelLeft: "UNIFORME",
        labelRight: "FAST FASHION",
        badge: "Imagen",
        title: "EXPRESIÓN",
        desc: "La ropa es lenguaje, pero el consumo compulsivo es destrucción. Podemos tener estilo sin explotar el planeta ni convertirnos en vallas publicitarias.",
        leftTitle: "VISTE<br />GRIS",
        leftDesc: "DESTACAR ES VANIDAD.",
        rightTitle: "COMPRA<br />Y TIRA",
        rightDesc: "ESTRENAR ES FELICIDAD."
    },
    {
        id: "juego",
        labelLeft: "PROHIBICIÓN",
        labelRight: "LUDOPATÍA",
        badge: "Vicio",
        title: "AZAR",
        desc: "El juego es entretenimiento adulto, pero la industria predatoria destruye familias. Regular la publicidad agresiva es proteger la libertad de elegir sin trampas.",
        leftTitle: "DIVERSIÓN<br />ILEGAL",
        leftDesc: "EL PLACER ES PECADO.",
        rightTitle: "APUESTA<br />LA CASA",
        rightDesc: "EL PRÓXIMO TIRO TE SALVA."
    },
    {
        id: "turismo",
        labelLeft: "TOURIST GO HOME",
        labelRight: "PARQUE TEMÁTICO",
        badge: "Viajes",
        title: "EXPLORACIÓN",
        desc: "Viajar abre la mente, pero el turismo de masas cierra los barrios. Queremos conocer el mundo sin convertirlo en un escenario de cartón piedra.",
        leftTitle: "FUERA DE<br />AQUÍ",
        leftDesc: "LOS EXTRANJEROS MOLESTAN.",
        rightTitle: "VENDE TU<br />BARRIO",
        rightDesc: "TODO ES UN AIRBNB."
    },
    {
        id: "lenguaje",
        labelLeft: "LENGUAJE INCLUSIVO",
        labelRight: "PURISMO RAE",
        badge: "Comunicación",
        title: "PALABRAS",
        desc: "El lenguaje evoluciona con la sociedad, pero imponer cambios artificiales genera rechazo. Hablemos para entendernos, no para señalar virtud política.",
        leftTitle: "HABLA BIEN<br />MALDITO",
        leftDesc: "LA 'E' DESTRUYE LA FAMILIA.",
        rightTitle: "LA RAE ES<br />MACHISTA",
        rightDesc: "CAMBIA O ERES EL ENEMIGO."
    },
    {
        id: "deporte",
        labelLeft: "GANAR ES TODO",
        labelRight: "PARTICIPACIÓN",
        badge: "Competición",
        title: "ESFUERZO",
        desc: "La excelencia requiere sacrificio y hay ganadores y perdedores. Pero el deporte base debe fomentar valores, no frustraciones prematuras.",
        leftTitle: "EL SEGUNDO<br />ES EL PRIMER PERDEDOR",
        leftDesc: "HUMILLA A TU RIVAL.",
        rightTitle: "TODOS SON<br />CAMPEONES",
        rightDesc: "PERDER TRAUMA PARA SIEMPRE."
    },
    {
        id: "soledad",
        labelLeft: "HIKIKOMORI",
        labelRight: "SOCIALIZACIÓN FORZADA",
        badge: "Comunidad",
        title: "CONEXIÓN",
        desc: "Saber estar solo es vital, pero aislarse es patológico. Somos animales sociales que necesitan la tribu, aunque la tribu a veces agobie.",
        leftTitle: "ODIO A LA<br />GENTE",
        leftDesc: "MI HABITACIÓN ES MI MUNDO.",
        rightTitle: "SONRÍE Y<br />PARTICIPA",
        rightDesc: "LA INTROVERSIÓN SE CURA."
    }
];
