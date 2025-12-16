export const fortunes = [
    "La suerte que buscas está en otra galleta.",
    "No cuentes los días, haz que los días cuenten.",
    "Un viaje de mil millas comienza con un solo paso.",
    "El error es el preámbulo del descubrimiento.",
    "Tu capacidad de aprender es tu mayor activo.",
    "Sonríe, el universo te está mirando.",
    "La paciencia es un árbol de raíz amarga pero de frutos muy dulces.",
    "No temas crecer lentamente, teme solo quedarte quieto.",
    "Hoy es el mañana que tanto te preocupaba ayer.",
    "La felicidad no es algo hecho. Proviene de tus propias acciones.",
    "Si no puedes cambiar la dirección del viento, ajusta tus velas.",
    "Lo que plantas ahora, lo cosecharás más tarde.",
    "La creatividad es la inteligencia divirtiéndose.",
    "No busques errores, busca soluciones.",
    "Tu actitud, no tu aptitud, determinará tu altitud.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "Cree que puedes y ya estarás a medio camino.",
    "La única forma de hacer un gran trabajo es amar lo que haces.",
    "No esperes. El momento nunca será el 'adecuado'.",
    "La vida es un 10% lo que te sucede y un 90% cómo reaccionas ante ello.",
    "El fracaso es éxito si aprendemos de él.",
    "Sé el cambio que quieres ver en el mundo.",
    "La mejor venganza es el éxito masivo.",
    "A veces, el camino más largo es el más corto a casa.",
    "La verdadera sabiduría está en reconocer tu propia ignorancia.",
    "Quien mira hacia afuera sueña; quien mira hacia adentro despierta.",
    "La vida es demasiado importante para tomársela en serio.",
    "No dejes para mañana lo que puedas hacer hoy.",
    "La suerte favorece a la mente preparada.",
    "El coraje no es la ausencia de miedo, sino el triunfo sobre él."
];

export const luckyNumbers = () => {
    const numbers = new Set<number>();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 49) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
};
