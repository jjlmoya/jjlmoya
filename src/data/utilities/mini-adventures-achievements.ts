import type { CategoryId } from "./mini-adventures";

export interface Achievement {
    id: string;
    milestone: number;
    label: string;
    categoryId: CategoryId | 'global';
    icon: string;
    description: string;
}

export const ADVENTURE_ACHIEVEMENTS: Achievement[] = [
    { id: 'g1', milestone: 1, label: "El Despertar", categoryId: 'global', icon: 'mdi:footprint', description: "Tu primera mini aventura completada." },
    { id: 'g10', milestone: 10, label: "Hábito de Asombro", categoryId: 'global', icon: 'mdi:sparkles', description: "Has roto la rutina 10 veces." },
    { id: 'g50', milestone: 50, label: "Coleccionista de Días", categoryId: 'global', icon: 'mdi:calendar-star', description: "50 días haciendo que lo ordinario sea extraordinario." },
    { id: 'g150', milestone: 150, label: "Maestro del Azar", categoryId: 'global', icon: 'mdi:trophy-variant', description: "Has completado la mitad del catálogo de aventuras." },
    { id: 'g300', milestone: 300, label: "Espíritu Libre", categoryId: 'global', icon: 'mdi:ghost', description: "Has dominado el arte de la aventura cotidiana." },

    { id: 'e3', milestone: 3, label: "Turista en Casa", categoryId: 'exploration', icon: 'mdi:map-marker-outline', description: "3 rincones nuevos descubiertos." },
    { id: 'e15', milestone: 15, label: "Cartógrafo Urbano", categoryId: 'exploration', icon: 'mdi:map-check', description: "Conoces tu código postal mejor que nadie." },

    { id: 'f3', milestone: 3, label: "Paladar Inquieto", categoryId: 'food', icon: 'mdi:silverware-clean', description: "Has probado 3 sabores que no conocías." },
    { id: 'f15', milestone: 15, label: "Alquimista Gourmet", categoryId: 'food', icon: 'mdi:silverware-variant', description: "Tu despensa es un pasaporte al mundo." },

    { id: 'l3', milestone: 3, label: "Aprendiz de Todo", categoryId: 'learning', icon: 'mdi:book-open-page-variant', description: "Has aprendido 3 curiosidades del mundo." },
    { id: 'l15', milestone: 15, label: "Biblioteca Andante", categoryId: 'learning', icon: 'mdi:head-cog', description: "Tu curiosidad no conoce límites." },

    { id: 'c3', milestone: 3, label: "Mano que Dibuja", categoryId: 'creativity', icon: 'mdi:palette-outline', description: "Has dejado tu huella en 3 pequeños retos." },
    { id: 'c15', milestone: 15, label: "Vanguardista Local", categoryId: 'creativity', icon: 'mdi:palette-swatch', description: "Ves arte donde otros solo ven calle." },

    { id: 's3', milestone: 3, label: "Puente Humano", categoryId: 'social', icon: 'mdi:account-voice', description: "Has conectado con 3 personas hoy." },
    { id: 's15', milestone: 15, label: "Alma de la Calle", categoryId: 'social', icon: 'mdi:account-group', description: "Has convertido a desconocidos en historias." },

    { id: 'o3', milestone: 3, label: "Detallista", categoryId: 'observation', icon: 'mdi:magnify', description: "Has visto 3 cosas que nadie más nota." },
    { id: 'o15', milestone: 15, label: "Ojo de Cineasta", categoryId: 'observation', icon: 'mdi:telescope', description: "Tu mirada es el objetivo de una gran película." },

    { id: 'w3', milestone: 3, label: "Pausa Consciente", categoryId: 'wellness', icon: 'mdi:leaf', description: "Has dedicado 3 momentos a tu paz mental." },
    { id: 'w15', milestone: 15, label: "Equilibrio Total", categoryId: 'wellness', icon: 'mdi:spa', description: "Tu cuerpo y mente te lo agradecen." }
];
