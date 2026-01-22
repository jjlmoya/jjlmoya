export type CategoryId =
    | "exploration"
    | "food"
    | "learning"
    | "creativity"
    | "social"
    | "observation"
    | "wellness";

export interface AdventureCategory {
    id: CategoryId;
    label: string;
    icon: string;
    color: string;
    styling: string;
}

export const ADVENTURE_CATEGORIES: Record<CategoryId, AdventureCategory> = {
    exploration: {
        id: "exploration",
        label: "Exploración",
        icon: "mdi:map-marker-path",
        color: "#10b981",
        styling: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    },
    food: {
        id: "food",
        label: "Gastronomía",
        icon: "mdi:food-variant",
        color: "#f97316",
        styling: "border-orange-500/30 text-orange-400 bg-orange-500/5",
    },
    learning: {
        id: "learning",
        label: "Aprendizaje",
        icon: "mdi:book-open-variant",
        color: "#3b82f6",
        styling: "border-blue-500/30 text-blue-400 bg-blue-500/5",
    },
    creativity: {
        id: "creativity",
        label: "Creatividad",
        icon: "mdi:palette",
        color: "#ec4899",
        styling: "border-pink-500/30 text-pink-400 bg-pink-500/5",
    },
    social: {
        id: "social",
        label: "Social",
        icon: "mdi:account-group",
        color: "#06b6d4",
        styling: "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
    },
    observation: {
        id: "observation",
        label: "Observación",
        icon: "mdi:eye",
        color: "#eab308",
        styling: "border-yellow-500/30 text-yellow-400 bg-yellow-500/5",
    },
    wellness: {
        id: "wellness",
        label: "Bienestar",
        icon: "mdi:heart-pulse",
        color: "#f43f5e",
        styling: "border-rose-500/30 text-rose-400 bg-rose-500/5",
    },
};

export interface Adventure {
    id: number;
    text: string;
    categoryId: CategoryId;
}

export const ADVENTURES: Adventure[] = [
    {
        id: 1,
        text: "Prueba un café o bebida en un sitio donde nunca hayas entrado antes.",
        categoryId: "food",
    },
    {
        id: 2,
        text: "Camina 10 minutos en una dirección que normalmente no tomas al salir de casa.",
        categoryId: "exploration",
    },
    {
        id: 3,
        text: 'Aprende cómo se dice "Gracias" en tres idiomas diferentes que no conozcas.',
        categoryId: "learning",
    },
    {
        id: 4,
        text: "Haz una foto a un detalle arquitectónico que te llame la atención en tu calle.",
        categoryId: "creativity",
    },
    {
        id: 5,
        text: "Compra una fruta que nunca hayas probado y descubre su sabor.",
        categoryId: "food",
    },
    {
        id: 6,
        text: "Busca una placa conmemorativa en tu barrio y lee la historia que cuenta.",
        categoryId: "exploration",
    },
    {
        id: 7,
        text: "Dibuja algo que tengas frente a ti en menos de 60 segundos.",
        categoryId: "creativity",
    },
    { id: 8, text: "Saluda a un vecino con el que normalmente no hablas.", categoryId: "social" },
    {
        id: 9,
        text: "Escucha un género musical que no sea de tu agrado habitual durante 5 minutos.",
        categoryId: "learning",
    },
    {
        id: 10,
        text: "Visita una tienda de antigüedades o de segunda mano y encuentra el objeto más raro.",
        categoryId: "exploration",
    },
    {
        id: 11,
        text: "Siéntate en un parque y cuenta cuántos tipos diferentes de pájaros ves.",
        categoryId: "observation",
    },
    {
        id: 12,
        text: "Escribe una nota positiva y déjala dentro de un libro en una biblioteca pública.",
        categoryId: "social",
    },
    {
        id: 13,
        text: "Haz una lista de 5 cosas por las que estás agradecido hoy.",
        categoryId: "wellness",
    },
    {
        id: 14,
        text: "Intenta cocinar una receta nueva usando solo lo que tienes en la despensa.",
        categoryId: "food",
    },
    {
        id: 15,
        text: "Pasa 20 minutos sin mirar ninguna pantalla (móvil, TV, PC).",
        categoryId: "wellness",
    },
    {
        id: 16,
        text: "Encuentra un árbol cerca de tu casa y trata de identificar de qué especie es.",
        categoryId: "learning",
    },
    {
        id: 17,
        text: "Llama a alguien a quien no hayas hablado en más de un mes.",
        categoryId: "social",
    },
    {
        id: 18,
        text: "Reordena un rincón de tu casa que siempre dejes para después.",
        categoryId: "wellness",
    },
    {
        id: 19,
        text: "Lee el primer capítulo de un libro que no sea de tu género favorito.",
        categoryId: "learning",
    },
    {
        id: 20,
        text: "Intenta hacer un origami básico siguiendo un tutorial rápido.",
        categoryId: "creativity",
    },
    {
        id: 21,
        text: "Fíjate en el color de los ojos de todas las personas con las que hables hoy.",
        categoryId: "observation",
    },
    {
        id: 22,
        text: "Busca una constelación en el cielo si es de noche y el cielo está despejado.",
        categoryId: "observation",
    },
    {
        id: 23,
        text: "Haz un cumplido sincero a un desconocido o a un dependiente.",
        categoryId: "social",
    },
    {
        id: 24,
        text: "Lleva una bolsa y recoge 5 piezas de basura que encuentres por la calle.",
        categoryId: "wellness",
    },
    {
        id: 25,
        text: "Prueba a escribir una frase con tu mano no dominante.",
        categoryId: "learning",
    },
    {
        id: 26,
        text: "Busca un mercado local y compra algo que haya sido cultivado cerca.",
        categoryId: "food",
    },
    {
        id: 27,
        text: "Detente y escucha los sonidos del ambiente durante 2 minutos sin moverte.",
        categoryId: "observation",
    },
    {
        id: 28,
        text: "Mira el amanecer o el atardecer sin hacer nada más al mismo tiempo.",
        categoryId: "wellness",
    },
    {
        id: 29,
        text: "Encuentra una tipografía interesante en un cartel de la calle y trata de copiarla.",
        categoryId: "creativity",
    },
    {
        id: 30,
        text: "Propón un plan pequeño a un amigo que no esperes ver hoy.",
        categoryId: "social",
    },
    {
        id: 31,
        text: "Encuentra un callejón o una plaza por la que nunca hayas pasado.",
        categoryId: "exploration",
    },
    {
        id: 32,
        text: "Compra una revista sobre un tema del que no sepas absolutamente nada.",
        categoryId: "learning",
    },
    {
        id: 33,
        text: "Elige una especia que nunca uses y añádela a tu próxima comida.",
        categoryId: "food",
    },
    {
        id: 34,
        text: "Haz una lista de 3 lugares a los que te gustaría viajar en tu ciudad.",
        categoryId: "exploration",
    },
    {
        id: 35,
        text: "Escribe un poema corto de solo 4 versos sobre algo que veas ahora.",
        categoryId: "creativity",
    },
    { id: 36, text: "Visita un museo o galería gratuita de tu zona.", categoryId: "learning" },
    { id: 37, text: "Bebe un vaso grande de agua ahora mismo.", categoryId: "wellness" },
    {
        id: 38,
        text: "Fíjate en qué flores están floreciendo en los jardines de tu barrio.",
        categoryId: "observation",
    },
    { id: 39, text: "Escucha un podcast sobre historia antigua.", categoryId: "learning" },
    {
        id: 40,
        text: "Haz una caminata consciente, prestando atención a tus pies tocando el suelo.",
        categoryId: "wellness",
    },
    { id: 41, text: "Baila tu canción favorita solo en tu habitación.", categoryId: "creativity" },
    {
        id: 42,
        text: "Deja una reseña positiva en un pequeño negocio que te guste.",
        categoryId: "social",
    },
    { id: 43, text: "Prueba un postre tradicional de otro país.", categoryId: "food" },
    {
        id: 44,
        text: "Encuentra un objeto de color rojo cada 50 pasos hasta llegar a 10.",
        categoryId: "observation",
    },
    { id: 45, text: "Aprende a hacer un nudo marinero básico.", categoryId: "learning" },
    {
        id: 46,
        text: "Si ves un animal en la calle (perro, gato), fíjate en su comportamiento un minuto.",
        categoryId: "observation",
    },
    {
        id: 47,
        text: "Toma una ruta de autobús o metro que no frecuentas y bájate en una parada al azar.",
        categoryId: "exploration",
    },
    {
        id: 48,
        text: "Escribe 3 frases motivadoras en un post-it y pégalo en tu espejo.",
        categoryId: "wellness",
    },
    {
        id: 49,
        text: "Visita una biblioteca y elige un libro solo por su portada.",
        categoryId: "exploration",
    },
    {
        id: 50,
        text: "Pregunta a alguien mayor que tú cuál era su juego favorito de la infancia.",
        categoryId: "social",
    },
    {
        id: 51,
        text: "Intenta equilibrar un objeto sobre tu dedo durante 10 segundos.",
        categoryId: "creativity",
    },
    {
        id: 52,
        text: "Busca en el diccionario una palabra que no conozcas y úsala hoy.",
        categoryId: "learning",
    },
    {
        id: 53,
        text: "Observa las nubes y encuentra 3 formas reconocibles.",
        categoryId: "observation",
    },
    { id: 54, text: "Haz 10 sentadillas o estira durante 5 minutos.", categoryId: "wellness" },
    { id: 55, text: "Cocina algo que requiera amasar con las manos.", categoryId: "creativity" },
    {
        id: 56,
        text: "Busca un grafiti cercano y trata de entender qué mensaje transmite.",
        categoryId: "observation",
    },
    {
        id: 57,
        text: "Sal a caminar sin destino fijo durante 15 minutos.",
        categoryId: "exploration",
    },
    {
        id: 58,
        text: "Haz una lista de 3 canciones que te traigan buenos recuerdos.",
        categoryId: "wellness",
    },
    {
        id: 59,
        text: "Pregunta al panadero cuál es su pan favorito y llévate una pieza.",
        categoryId: "food",
    },
    {
        id: 60,
        text: "Escribe a un profesor o mentor que te influyera para darle las gracias.",
        categoryId: "social",
    },
    {
        id: 61,
        text: "Encuentra una calle con el nombre de una persona y busca quién fue.",
        categoryId: "learning",
    },
    {
        id: 62,
        text: "Cierra los ojos y trata de adivinar qué hay en tu nevera solo por el tacto.",
        categoryId: "observation",
    },
    {
        id: 63,
        text: "Planta una semilla o cuida de una planta que tengas abandonada.",
        categoryId: "wellness",
    },
    {
        id: 64,
        text: "Envía un artículo interesante a un amigo sin explicar por qué, solo para compartir.",
        categoryId: "social",
    },
    {
        id: 65,
        text: "Haz una lista de 5 cosas que te gustaría aprender este año.",
        categoryId: "learning",
    },
    {
        id: 66,
        text: "Mira una película en versión original con subtítulos en ese mismo idioma.",
        categoryId: "learning",
    },
    {
        id: 67,
        text: "Intenta hacer malabares con dos o tres objetos pequeños.",
        categoryId: "creativity",
    },
    {
        id: 68,
        text: "Compra un ingrediente en una tienda de alimentación exótica.",
        categoryId: "food",
    },
    {
        id: 69,
        text: "Fíjate en las sombras que proyectan los edificios a distintas horas.",
        categoryId: "observation",
    },
    { id: 70, text: "Escribe una lista de 10 cosas que te hacen sonreír.", categoryId: "wellness" },
    {
        id: 71,
        text: "Busca un banco con vistas y quédate sentado 5 minutos mirando hacia adelante.",
        categoryId: "exploration",
    },
    {
        id: 72,
        text: "Pregunta a tus padres una historia sobre tus abuelos que no conozcas.",
        categoryId: "social",
    },
    {
        id: 73,
        text: "Toma una foto de algo feo y trata de que parezca artístico.",
        categoryId: "creativity",
    },
    { id: 74, text: "Aprende 3 palabras nuevas en lengua de signos.", categoryId: "learning" },
    { id: 75, text: "Huele tres flores diferentes y nota sus matices.", categoryId: "observation" },
    {
        id: 76,
        text: "Escribe un diario de lo que has hecho hoy antes de dormir.",
        categoryId: "wellness",
    },
    { id: 77, text: "Busca una receta de cóctel sin alcohol y prepárala.", categoryId: "food" },
    {
        id: 78,
        text: "Intenta caminar por encima de un bordillo sin caerte.",
        categoryId: "exploration",
    },
    { id: 79, text: "Dibuja un mapa de tu barrio de memoria.", categoryId: "creativity" },
    {
        id: 80,
        text: "Envía un mensaje a alguien que hace tiempo que no ves diciéndole que te has acordado de él.",
        categoryId: "social",
    },
    {
        id: 81,
        text: "Fíjate en cómo visten 5 personas diferentes y crea una historia para ellas.",
        categoryId: "observation",
    },
    { id: 82, text: "Aprende el nombre científico de tu animal favorito.", categoryId: "learning" },
    {
        id: 83,
        text: "Hazte un té o una infusión y bébetela saboreando cada sorbo.",
        categoryId: "wellness",
    },
    {
        id: 84,
        text: "Ve a una zona de tu ciudad que no sea comercial y pasea.",
        categoryId: "exploration",
    },
    {
        id: 85,
        text: "Observa los tipos de nubes y compáralos con un Atlas de nubes online.",
        categoryId: "observation",
    },
    { id: 86, text: "Escribe una carta a tu 'yo' de dentro de un año.", categoryId: "wellness" },
    {
        id: 87,
        text: "Prueba el pan de una cultura diferente (pita, naan, arepa...).",
        categoryId: "food",
    },
    { id: 88, text: "Intenta silbar una melodía completa.", categoryId: "creativity" },
    {
        id: 89,
        text: "Fíjate en los carteles de los locales antiguos que quedan en tu zona.",
        categoryId: "observation",
    },
    {
        id: 90,
        text: "Dona tres prendas de ropa que no hayas usado en un año.",
        categoryId: "social",
    },
    { id: 91, text: "Aprende a decir 'Holo' en 5 idiomas.", categoryId: "learning" },
    {
        id: 92,
        text: "Encuentra una estatua y dedica un minuto a mirar cada detalle de ella.",
        categoryId: "observation",
    },
    {
        id: 93,
        text: "Camina descalzo sobre hierba o arena durante unos minutos.",
        categoryId: "wellness",
    },
    {
        id: 94,
        text: "Pregunta en la carnicería o pescadería cuál es el producto de temporada.",
        categoryId: "food",
    },
    {
        id: 95,
        text: "Copia un dibujo sencillo de un artista que te guste.",
        categoryId: "creativity",
    },
    {
        id: 96,
        text: "Pasa por una tienda de cómics o de juegos de mesa solo para mirar.",
        categoryId: "exploration",
    },
    {
        id: 97,
        text: "Nota la temperatura del aire en tu piel al salir de casa.",
        categoryId: "observation",
    },
    { id: 98, text: "Haz 5 minutos de estiramientos de cuello y espalda.", categoryId: "wellness" },
    { id: 99, text: "Aprende un dato curioso sobre la Luna.", categoryId: "learning" },
    {
        id: 100,
        text: "Regala una flor (puede ser recogida) a alguien cercano.",
        categoryId: "social",
    },
    {
        id: 101,
        text: "Mira hacia arriba y fíjate en los tejados y cornisas de tu calle.",
        categoryId: "observation",
    },
    {
        id: 102,
        text: "Busca un pasillo en el supermercado por el que nunca pases y mira qué venden.",
        categoryId: "exploration",
    },
    {
        id: 103,
        text: "Prueba una infusión que tenga una mezcla de hierbas que no conozcas.",
        categoryId: "food",
    },
    {
        id: 104,
        text: "Aprende a reciclar un objeto viejo en algo útil hoy.",
        categoryId: "creativity",
    },
    { id: 105, text: "Haz un minuto de respiración profunda consciente.", categoryId: "wellness" },
    { id: 106, text: "Busca el origen del nombre de tu país o región.", categoryId: "learning" },
    {
        id: 107,
        text: "Di 'buenos días' animadamente a la primera persona que veas fuera de casa.",
        categoryId: "social",
    },
    { id: 108, text: "Toma una foto de una sombra interesante.", categoryId: "creativity" },
    { id: 109, text: "Encuentra una piedra bonita y guárdala por hoy.", categoryId: "observation" },
    {
        id: 110,
        text: "Haz una lista de 3 personas que te inspiran y por qué.",
        categoryId: "wellness",
    },
    {
        id: 111,
        text: "Come algo sin usar cubiertos (que normalmente los requiera).",
        categoryId: "food",
    },
    {
        id: 112,
        text: "Busca una canción que fuera número uno el año que naciste.",
        categoryId: "learning",
    },
    {
        id: 113,
        text: "Intenta identificar 5 sonidos diferentes con los ojos cerrados.",
        categoryId: "observation",
    },
    { id: 114, text: "Aprende qué significa tu nombre.", categoryId: "learning" },
    {
        id: 115,
        text: "Busca un refugio de animales cercano y mira si necesitan voluntarios.",
        categoryId: "social",
    },
    {
        id: 116,
        text: "Dibuja un patrón geométrico repetitivo en un papel.",
        categoryId: "creativity",
    },
    {
        id: 117,
        text: "Frecuenta una cafetería de barrio y lee el periódico local.",
        categoryId: "exploration",
    },
    { id: 118, text: "Recuerda un sueño que hayas tenido y escríbelo.", categoryId: "wellness" },
    {
        id: 119,
        text: "Fíjate en los colores de las puertas de las casas por las que pases.",
        categoryId: "observation",
    },
    { id: 120, text: "Cocina algo inspirándote en un libro o película.", categoryId: "creativity" },
    {
        id: 121,
        text: "Encuentra 3 objetos que no uses en absoluto y deshazte de ellos.",
        categoryId: "wellness",
    },
    { id: 122, text: "Aprende a hacer un avión de papel perfecto.", categoryId: "creativity" },
    {
        id: 123,
        text: "Busca una zona con árboles y quédate quieto escuchando el viento.",
        categoryId: "exploration",
    },
    {
        id: 124,
        text: "Pregunta a alguien joven qué aplicación de móvil es la que más usa.",
        categoryId: "social",
    },
    {
        id: 125,
        text: "Observa el cielo a mediodía y a media tarde; nota el cambio de azul.",
        categoryId: "observation",
    },
    {
        id: 126,
        text: "Busca una palabra en otro idioma que no tenga traducción directa al tuyo.",
        categoryId: "learning",
    },
    {
        id: 127,
        text: "Prepara una ensalada con al menos 5 colores diferentes.",
        categoryId: "food",
    },
    {
        id: 128,
        text: "Intenta aguantar la risa mirando a alguien a los ojos durante un minuto.",
        categoryId: "social",
    },
    {
        id: 129,
        text: "Nota cómo cambia el sonido de tus pasos en diferentes superficies.",
        categoryId: "observation",
    },
    {
        id: 130,
        text: "Haz un masaje rápido en tus manos con un poco de crema.",
        categoryId: "wellness",
    },
    { id: 131, text: "Ve a un mirador o a un punto alto de tu ciudad.", categoryId: "exploration" },
    { id: 132, text: "Busca un tutorial sobre cómo silbar con los dedos.", categoryId: "learning" },
    {
        id: 133,
        text: "Haz una lista de 5 cosas que te gustaba hacer cuando tenías 10 años.",
        categoryId: "wellness",
    },
    {
        id: 134,
        text: "Busca una noticia de ciencia positiva que haya ocurrido esta semana.",
        categoryId: "learning",
    },
    {
        id: 135,
        text: "Fíjate en el diseño de las alcantarillas de tu calle.",
        categoryId: "observation",
    },
    {
        id: 136,
        text: "Prueba una fruta exótica de la que nunca hayas oído hablar.",
        categoryId: "food",
    },
    {
        id: 137,
        text: "Recorta una noticia de un periódico físico (o imprime una online) y guárdala.",
        categoryId: "exploration",
    },
    {
        id: 138,
        text: "Escribe una frase amable en el vaho de una ventana.",
        categoryId: "creativity",
    },
    {
        id: 139,
        text: "Intenta decir un trabalenguas difícil 3 veces rápido.",
        categoryId: "creativity",
    },
    {
        id: 140,
        text: "Escucha el álbum completo de un artista que respetes pero no escuches.",
        categoryId: "learning",
    },
    {
        id: 141,
        text: "Nota la dirección de la que viene el viento hoy.",
        categoryId: "observation",
    },
    {
        id: 142,
        text: "Haz una visualización de 2 minutos sobre tu lugar ideal para estar.",
        categoryId: "wellness",
    },
    {
        id: 143,
        text: "Pregunta a alguien por una recomendación de libro y léelo.",
        categoryId: "social",
    },
    {
        id: 144,
        text: "Encuentra una flor que crezca entre los ladrillos o el asfalto.",
        categoryId: "observation",
    },
    {
        id: 145,
        text: "Ve a la parte más antigua de tu población y pasea.",
        categoryId: "exploration",
    },
    { id: 146, text: "Prueba a beber agua tibia con limón por la mañana.", categoryId: "wellness" },
    {
        id: 147,
        text: "Haz un collage con recortes de folletos publicitarios.",
        categoryId: "creativity",
    },
    { id: 148, text: "Aprende por qué el cielo es azul.", categoryId: "learning" },
    {
        id: 149,
        text: "Come sin distracciones: sin móvil, sin música, sin lectura.",
        categoryId: "wellness",
    },
    {
        id: 150,
        text: "Fíjate en las texturas de las cortezas de diferentes árboles.",
        categoryId: "observation",
    },
    {
        id: 151,
        text: "Busca una tienda local de especias y entra solo por el aroma.",
        categoryId: "exploration",
    },
    { id: 152, text: "Lleva una prenda de color que no suelas usar.", categoryId: "wellness" },
    {
        id: 153,
        text: "Prueba un tipo de miel diferente (romero, azahar, castaño...).",
        categoryId: "food",
    },
    {
        id: 154,
        text: "Intenta chasquear los dedos con ambas manos al mismo tiempo.",
        categoryId: "creativity",
    },
    {
        id: 155,
        text: "Abre la ventana y ventila toda tu casa durante 10 minutos.",
        categoryId: "wellness",
    },
    {
        id: 156,
        text: "Busca un refrán antiguo y piensa si todavía se aplica.",
        categoryId: "learning",
    },
    {
        id: 157,
        text: "Mira a los ojos a un animal doméstico hasta que desvíe la mirada.",
        categoryId: "observation",
    },
    {
        id: 158,
        text: "Deja una moneda en un lugar donde alguien la encuentre con una nota.",
        categoryId: "social",
    },
    {
        id: 159,
        text: "Busca una planta que crezca en una grieta y hazle una foto.",
        categoryId: "creativity",
    },
    {
        id: 160,
        text: "Aprende el nombre de 3 herramientas de carpintería.",
        categoryId: "learning",
    },
    {
        id: 161,
        text: "Nota el olor del aire justo antes o justo después de llover.",
        categoryId: "observation",
    },
    {
        id: 162,
        text: "Pon una canción que te haga sentir poderoso nada más levantarte.",
        categoryId: "wellness",
    },
    { id: 163, text: "Escribe 10 palabras que rimen con 'aventura'.", categoryId: "creativity" },
    {
        id: 164,
        text: "Haz una caminata de 15 minutos solo prestando atención a los tejados.",
        categoryId: "observation",
    },
    {
        id: 165,
        text: "Dibuja un animal inventado combinando dos que conozcas.",
        categoryId: "creativity",
    },
    { id: 166, text: "Aprende cómo se cultiva tu verdura favorita.", categoryId: "learning" },
    {
        id: 167,
        text: "Pregunta a alguien en el supermercado qué receta va a hacer con lo que lleva.",
        categoryId: "social",
    },
    {
        id: 168,
        text: "Nota el peso de tu ropa sobre tus hombros durante un minuto.",
        categoryId: "observation",
    },
    {
        id: 169,
        text: "Cierra los ojos y trata de recordar el plano de tu casa habitación por habitación.",
        categoryId: "wellness",
    },
    {
        id: 170,
        text: "Ve a una zona verde cerca de ti y quédate en silencio sepulcral.",
        categoryId: "exploration",
    },
    {
        id: 171,
        text: "Busca un tutorial sobre cómo leer el mapa de estrellas.",
        categoryId: "learning",
    },
    {
        id: 172,
        text: "Escribe tres cosas que te gustaría agradecerte a ti mismo hoy.",
        categoryId: "wellness",
    },
    {
        id: 173,
        text: "Prueba una combinación de alimentos extraña y mira si te gusta.",
        categoryId: "food",
    },
    {
        id: 174,
        text: "Intenta identificar un olor agradable mientras caminas por la calle.",
        categoryId: "observation",
    },
    {
        id: 175,
        text: "Pon a prueba tu equilibrio sobre una sola pierna durante 30 segundos cada una.",
        categoryId: "wellness",
    },
    { id: 176, text: "Hazle un dibujo rápido a alguien cercano y dáselo.", categoryId: "social" },
    {
        id: 177,
        text: "Aprende qué es un 'haiku' e intenta escribir uno.",
        categoryId: "creativity",
    },
    {
        id: 178,
        text: "Mira hacia atrás cuando vayas caminando y fíjate en la perspectiva.",
        categoryId: "observation",
    },
    {
        id: 179,
        text: "Pon un fondo de pantalla nuevo que te inspire en tu móvil o PC.",
        categoryId: "wellness",
    },
    {
        id: 180,
        text: "Ve a una papelería y compra una sola pegatina o sobre bonito.",
        categoryId: "exploration",
    },
    {
        id: 181,
        text: "Aprende qué planetas son visibles a simple vista esta semana.",
        categoryId: "learning",
    },
    {
        id: 182,
        text: "Intenta tararear una canción mientras te cepillas los dientes.",
        categoryId: "wellness",
    },
    {
        id: 183,
        text: "Fíjate en los tipos de ventanas que hay en tu calle (madera, aluminio, modernas...).",
        categoryId: "observation",
    },
    {
        id: 184,
        text: "Escribe un mensaje anónimo de ánimo y ponlo tras el limpiaparabrisas de un coche.",
        categoryId: "social",
    },
    {
        id: 185,
        text: "Dibuja un círculo perfecto a mano alzada (o inténtalo).",
        categoryId: "creativity",
    },
    { id: 186, text: "Mira una charla TED sobre un tema que desconozcas.", categoryId: "learning" },
    {
        id: 187,
        text: "Bebe tu bebida habitual pero a una temperatura distinta (té frío, café helado...).",
        categoryId: "food",
    },
    {
        id: 188,
        text: "Toma un camino de vuelta a casa que incluya una cuesta o escaleras nuevas.",
        categoryId: "exploration",
    },
    {
        id: 189,
        text: "Observa a un insecto durante 3 minutos y nota su trayectoria.",
        categoryId: "observation",
    },
    { id: 190, text: "Medita 1 minuto justo antes de almorzar.", categoryId: "wellness" },
    {
        id: 191,
        text: "Lleva una libreta y apunta 3 cosas curiosas que escuches hoy.",
        categoryId: "observation",
    },
    {
        id: 192,
        text: "Busca un vídeo de relajación con sonidos de la naturaleza.",
        categoryId: "wellness",
    },
    { id: 193, text: "Aprende a decir 'buen provecho' en 3 idiomas.", categoryId: "learning" },
    { id: 194, text: "Escribele una carta a tu versión de hace 10 años.", categoryId: "wellness" },
    {
        id: 195,
        text: "Come una fruta que debas pelar con las manos (mandarina, plátano...).",
        categoryId: "wellness",
    },
    {
        id: 196,
        text: "Busca el nombre de un pájaro local y trata de escucharlo cantar.",
        categoryId: "observation",
    },
    {
        id: 197,
        text: "Toma una foto de un reflejo en un cristal o charco.",
        categoryId: "creativity",
    },
    { id: 198, text: "Aprende cómo se fabrica el papel.", categoryId: "learning" },
    { id: 199, text: "Regala un cumplido sincero a alguien de tu familia.", categoryId: "social" },
    { id: 200, text: "Nota la sensación de tus manos al lavarlas hoy.", categoryId: "observation" },
    {
        id: 201,
        text: "Haz un avioncito de papel y lánzalo desde un punto alto.",
        categoryId: "creativity",
    },
    {
        id: 202,
        text: "Explora la sección de 'ofertas' de una tienda de ultramarinos y prueba algo.",
        categoryId: "food",
    },
    { id: 203, text: "Aprende un dato histórico sobre tu ciudad.", categoryId: "learning" },
    {
        id: 204,
        text: "Camina por el lado opuesto de la calle al que sueles ir.",
        categoryId: "exploration",
    },
    { id: 205, text: "Escribe una lista de 5 habilidades que tienes.", categoryId: "wellness" },
    {
        id: 206,
        text: "Pasa 5 minutos tarareando una melodía que te inventes.",
        categoryId: "creativity",
    },
    {
        id: 207,
        text: "Encuentra 3 elementos de metal en el exterior y tócalos (¡con cuidado!).",
        categoryId: "observation",
    },
    {
        id: 208,
        text: "Aprende qué es un 'palíndromo' y encuentra 3 ejemplos.",
        categoryId: "learning",
    },
    {
        id: 209,
        text: "Haz un cumplido a un compañero de trabajo sobre algo que no sea su trabajo.",
        categoryId: "social",
    },
    {
        id: 210,
        text: "Cierra los ojos y trata de ubicar mentalmente dónde está el norte.",
        categoryId: "observation",
    },
    { id: 211, text: "Ordena tus aplicaciones del móvil por colores.", categoryId: "wellness" },
    { id: 212, text: "Limpia la pantalla de tu ordenador o tablet.", categoryId: "wellness" },
    { id: 213, text: "Lee un cuento corto de un autor clásico.", categoryId: "learning" },
    {
        id: 214,
        text: "Averigua qué fruta es la más popular en el país más lejano que puedas pensar.",
        categoryId: "learning",
    },
    {
        id: 215,
        text: "Fíjate en las formas de los pomos de las puertas.",
        categoryId: "observation",
    },
    {
        id: 216,
        text: "Inventa un nombre para un color que no exista (ej. azul-queso).",
        categoryId: "creativity",
    },
    {
        id: 217,
        text: "Bebe un vaso de agua por cada café o refresco que tomes hoy.",
        categoryId: "wellness",
    },
    {
        id: 218,
        text: "Pregunta a alguien cómo aprendió su habilidad favorita.",
        categoryId: "social",
    },
    {
        id: 219,
        text: "Encuentra un objeto abandonado por la calle y piensa cómo llegó ahí.",
        categoryId: "observation",
    },
    {
        id: 220,
        text: "Busca un tutorial sobre cómo leer el lenguaje corporal.",
        categoryId: "learning",
    },
    { id: 221, text: "Prepara tu comida favorita de la infancia.", categoryId: "food" },
    {
        id: 222,
        text: "Escribe 3 cosas que te ilusionen de la próxima semana.",
        categoryId: "wellness",
    },
    { id: 223, text: "Haz un baile ridículo durante 2 minutos.", categoryId: "creativity" },
    {
        id: 224,
        text: "Busca un rincón sombrío de un parque y quédate allí.",
        categoryId: "exploration",
    },
    {
        id: 225,
        text: "Fíjate en el color de las bolsas que lleva la gente.",
        categoryId: "observation",
    },
    { id: 226, text: "Dibuja un ojo humano lo más realista posible.", categoryId: "creativity" },
    { id: 227, text: "Aprende el nombre de 5 tipos de setas.", categoryId: "learning" },
    {
        id: 228,
        text: "Pregunta al camarero por su canción favorita del hilo musical.",
        categoryId: "social",
    },
    {
        id: 229,
        text: "Busca una planta que tenga las hojas de dos colores.",
        categoryId: "observation",
    },
    { id: 230, text: "Haz 3 minutos de saltos o ejercicio intenso.", categoryId: "wellness" },
    {
        id: 231,
        text: "Averigua quién fue el primer habitante famoso de tu ciudad.",
        categoryId: "learning",
    },
    {
        id: 232,
        text: "Busca un banco que mire al tráfico y quédate 2 minutos observando los modelos de coches.",
        categoryId: "exploration",
    },
    {
        id: 233,
        text: "Escribe una lista de 5 adjetivos que te describan positivamente.",
        categoryId: "wellness",
    },
    {
        id: 234,
        text: "Intenta recordar el nombre de tus compañeros de clase de primaria.",
        categoryId: "learning",
    },
    { id: 235, text: "Averigua de dónde viene el agua que bebes.", categoryId: "learning" },
    { id: 236, text: "Prueba un tipo de té con leche al estilo de otro país.", categoryId: "food" },
    { id: 237, text: "Pela una fruta con un cuchillo de un solo tirón.", categoryId: "creativity" },
    {
        id: 238,
        text: "Cierra los ojos y camina unos pasos en línea recta (área segura).",
        categoryId: "observation",
    },
    {
        id: 239,
        text: "Haz una foto a una señal de tráfico que te guste.",
        categoryId: "creativity",
    },
    {
        id: 240,
        text: "Pregunta a alguien joven qué término de jerga es el más nuevo.",
        categoryId: "social",
    },
    { id: 241, text: "Aprende qué es la entropía.", categoryId: "learning" },
    { id: 242, text: "Busca una sombra que parezca un animal.", categoryId: "observation" },
    {
        id: 243,
        text: "Sonríe de forma exagerada frente al espejo durante 1 minuto.",
        categoryId: "wellness",
    },
    {
        id: 244,
        text: "Escribe 3 frases de gratitud en tu diario o libreta.",
        categoryId: "wellness",
    },
    { id: 245, text: "Busca un vídeo de un paisaje que te relaje.", categoryId: "wellness" },
    {
        id: 246,
        text: "Aprende el nombre de 3 constelaciones del hemisferio sur.",
        categoryId: "learning",
    },
    {
        id: 247,
        text: "Compra una postal y envíala por correo postal a alguien.",
        categoryId: "exploration",
    },
    {
        id: 248,
        text: "Fíjate en la cantidad de luz solar que entra en cada habitación hoy.",
        categoryId: "observation",
    },
    {
        id: 249,
        text: "Haz una construcción sencilla con objetos que tengas a mano.",
        categoryId: "creativity",
    },
    {
        id: 250,
        text: "Pregunta a alguien qué es lo mejor que le ha pasado hoy.",
        categoryId: "social",
    },
    {
        id: 251,
        text: "Aprende a hacer un nudo de corbata diferente (o por primera vez).",
        categoryId: "learning",
    },
    {
        id: 252,
        text: "Intenta identificar 3 olores diferentes en tu cocina.",
        categoryId: "observation",
    },
    {
        id: 253,
        text: "Ponte una canción infantil que te gustara de pequeño.",
        categoryId: "wellness",
    },
    {
        id: 254,
        text: "Ordena tus libros de una forma diferente (por altura, por color...).",
        categoryId: "wellness",
    },
    {
        id: 255,
        text: "Pregunta a un bibliotecario por una sección de la biblioteca que casi nadie visite.",
        categoryId: "exploration",
    },
    { id: 256, text: "Aprende 3 hitos de la historia de la aviación.", categoryId: "learning" },
    {
        id: 257,
        text: "Cierra los ojos e intenta adivinar qué hora es antes de mirar el reloj.",
        categoryId: "observation",
    },
    { id: 258, text: "Dibuja un mapa de tus sueños o metas.", categoryId: "creativity" },
    {
        id: 259,
        text: "Envía un mensaje amable a alguien con quien no trabajes a menudo.",
        categoryId: "social",
    },
    {
        id: 260,
        text: "Haz 10 respiraciones profundas antes de salir de casa.",
        categoryId: "wellness",
    },
    {
        id: 261,
        text: "Nota la suavidad o rugosidad de la tela de lo que llevas puesto.",
        categoryId: "observation",
    },
    { id: 262, text: "Compra un pan que tenga una forma curiosa.", categoryId: "food" },
    { id: 263, text: "Mira una película clásica de antes de 1970.", categoryId: "learning" },
    {
        id: 264,
        text: "Aprende qué es un agujero negro en términos sencillos.",
        categoryId: "learning",
    },
    {
        id: 265,
        text: "Ve a un cementerio antiguo y lee los epitafios por pura curiosidad histórica.",
        categoryId: "exploration",
    },
    {
        id: 266,
        text: "Fíjate en los tipos de piedras que se usan en las fachadas de tu zona.",
        categoryId: "observation",
    },
    { id: 267, text: "Escribe 10 cosas que te gustan de tu barrio.", categoryId: "wellness" },
    { id: 268, text: "Haz una escultura de barro o plastilina.", categoryId: "creativity" },
    {
        id: 269,
        text: "Pregunta en la oficina de turismo algo sobre tu propia ciudad.",
        categoryId: "exploration",
    },
    {
        id: 270,
        text: "Dibuja a un monstruo que represente tu mayor miedo, pero hazle un sombrero gracioso.",
        categoryId: "creativity",
    },
    { id: 271, text: "Aprende de dónde viene la palabra 'salario'.", categoryId: "learning" },
    {
        id: 272,
        text: "Fíjate en el sonido del clic al abrir y cerrar una puerta.",
        categoryId: "observation",
    },
    { id: 273, text: "Haz una lista de 5 películas que te harían llorar.", categoryId: "wellness" },
    {
        id: 274,
        text: "Busca un objeto en tu casa que tenga una historia especial y cuéntala a alguien.",
        categoryId: "social",
    },
    {
        id: 275,
        text: "Prueba a beber tu bebida favorita con una pajita (si no sueles hacerlo).",
        categoryId: "food",
    },
    {
        id: 276,
        text: "Trata de encontrar 10 objetos circulares en tu habitación.",
        categoryId: "observation",
    },
    { id: 277, text: "Lleva un sombrero hoy, aunque sea un rato.", categoryId: "wellness" },
    {
        id: 278,
        text: "Pregunta a tus abuelos qué era lo que más les asustaba de niños.",
        categoryId: "social",
    },
    { id: 279, text: "Aprende un dato sobre el fondo marino.", categoryId: "learning" },
    { id: 280, text: "Escribe un pequeño cuento de solo 6 palabras.", categoryId: "creativity" },
    { id: 281, text: "Mira un vídeo de un animal raro que no conocieras.", categoryId: "learning" },
    {
        id: 282,
        text: "Fíjate en las tipografías de los periódicos físicos.",
        categoryId: "observation",
    },
    {
        id: 283,
        text: "Escucha un disco de jazz mientras haces una tarea rutinaria.",
        categoryId: "learning",
    },
    {
        id: 284,
        text: "Toma una foto de un objeto muy cotidiano desde un ángulo extraño.",
        categoryId: "creativity",
    },
    {
        id: 285,
        text: "Visita una iglesia o lugar de culto antiguo solo por su arquitectura.",
        categoryId: "exploration",
    },
    { id: 286, text: "Dibuja el Skyline de tu ciudad de memoria.", categoryId: "creativity" },
    { id: 287, text: "Busca el origen de un apellido común en tu país.", categoryId: "learning" },
    { id: 288, text: "Nota la humedad del aire hoy.", categoryId: "observation" },
    {
        id: 289,
        text: "Haz sonar tus nudillos y date cuenta de cómo se siente.",
        categoryId: "wellness",
    },
    { id: 290, text: "Prueba a escribir de derecha a izquierda.", categoryId: "learning" },
    {
        id: 291,
        text: "Encuentra un objeto de color púrpura fuera de casa.",
        categoryId: "observation",
    },
    {
        id: 292,
        text: "Nota el sabor de la pasta de dientes durante un minuto.",
        categoryId: "observation",
    },
    {
        id: 293,
        text: "Escribe una lista de 3 sueños que recuerdes haber tenido.",
        categoryId: "wellness",
    },
    { id: 294, text: "Intenta caminar en cuclillas unos pasos.", categoryId: "creativity" },
    { id: 295, text: "Aprende qué es la fosa de las Marianas.", categoryId: "learning" },
    {
        id: 296,
        text: "Mira un mapa mundi y encuentra un país del que no sepas nada.",
        categoryId: "learning",
    },
    { id: 297, text: "Dibuja un patrón de puntos en un papel.", categoryId: "creativity" },
    {
        id: 298,
        text: "Pregunta al frutero cuál es su fruta 'secreta' más dulce.",
        categoryId: "social",
    },
    {
        id: 299,
        text: "Nota el calor del sol a través de un cristal hoy.",
        categoryId: "observation",
    },
    {
        id: 300,
        text: "Haz un plan para visitar un pueblo cercano el fin de semana.",
        categoryId: "exploration",
    },
    {
        id: 301,
        text: "Aprende cómo se llaman los dedos de la mano en latín.",
        categoryId: "learning",
    },
    {
        id: 302,
        text: "Encuentra una rima para cada palabra de esta frase.",
        categoryId: "creativity",
    },
    {
        id: 303,
        text: "Escribe un mensaje de agradecimiento a un amigo por algo que ocurrió hace tiempo.",
        categoryId: "social",
    },
];
