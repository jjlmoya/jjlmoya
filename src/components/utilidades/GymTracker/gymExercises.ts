export interface Exercise {
    id: string;
    name: string;
    category: string;
}

export const defaultExercises: Exercise[] = [
    { id: "bench-press", name: "Press de Banca", category: "Empuje" },
    { id: "overhead-press", name: "Press Militar", category: "Empuje" },
    { id: "push-press", name: "Push Press", category: "Empuje" },
    { id: "incline-db-press", name: "Press Inclinado con Mancuernas", category: "Empuje" },
    { id: "dips-triceps", name: "Fondos de Tríceps", category: "Empuje" },
    { id: "triceps-extensions", name: "Extensiones de Tríceps en Polea", category: "Empuje" },

    { id: "pull-up", name: "Dominadas", category: "Tracción" },
    { id: "barbell-row", name: "Remo con Barra", category: "Tracción" },
    { id: "lat-pulldown", name: "Jalón al Pecho", category: "Tracción" },
    { id: "db-row", name: "Remo con Mancuerna", category: "Tracción" },
    { id: "face-pulls", name: "Face Pulls", category: "Tracción" },
    { id: "biceps-curl", name: "Curl de Bíceps con Barra", category: "Tracción" },

    { id: "hip-thrust", name: "Hip Thrust", category: "Glúteo" },
    { id: "rdl", name: "Peso Muerto Rumano", category: "Glúteo" },
    { id: "lunges", name: "Zancadas", category: "Glúteo" },
    { id: "glute-kick", name: "Patada de Glúteo en Polea", category: "Glúteo" },
    { id: "hip-abduction", name: "Abducción de Cadera en Máquina", category: "Glúteo" },
    { id: "step-up", name: "Step Up", category: "Glúteo" }
];
