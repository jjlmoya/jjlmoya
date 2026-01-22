export const gamePassives = [
    {
        id: "rent-1",
        bId: "rent-shop",
        name: "Interés Variable",
        description: "Duplica los ingresos del Bazar de Deuda.",
        icon: "mdi:trending-down",
        cost: 500,
        requiredLvl: 10,
        rank: 1,
        effect: (e) => {
            const b = e.getBusiness("rent-shop");
            if (b) b.mult *= 2;
        },
    },
    {
        id: "rent-2",
        bId: "rent-shop",
        name: "Comisiones Ocultas",
        description: "Triplica los ingresos del Bazar de Deuda.",
        icon: "mdi:pill",
        cost: 5000,
        requiredLvl: 25,
        rank: 2,
        effect: (e) => {
            const b = e.getBusiness("rent-shop");
            if (b) b.mult *= 3;
        },
    },
    {
        id: "food-1",
        bId: "fast-food",
        name: "Aditivos E666",
        description: "Duplica ingresos del sector alimenticio.",
        icon: "mdi:bottle-tonic-plus",
        cost: 2500,
        requiredLvl: 15,
        rank: 1,
        effect: (e) => {
            const b = e.getBusiness("fast-food");
            if (b) b.mult *= 2;
        },
    },
    {
        id: "sym-food-rent",
        bId: "fast-food",
        name: "Combo Deuda-Menú",
        description: "Sinergia: Comida + Bazar. x5 ingresos Fast Food.",
        icon: "mdi:food-fork-drink",
        cost: 15000,
        requiredLvl: 20,
        otherReq: { bId: "rent-shop", lvl: 50 },
        rank: 2,
        effect: (e) => {
            const b = e.getBusiness("fast-food");
            if (b) b.mult *= 5;
        },
    },
    {
        id: "wash-1",
        bId: "laundry",
        name: "Blanqueo de Capitales",
        description: "Duplica ingresos de la Lavandería.",
        icon: "mdi:water",
        cost: 10000,
        requiredLvl: 20,
        rank: 1,
        effect: (e) => {
            const b = e.getBusiness("laundry");
            if (b) b.mult *= 2;
        },
    },
    {
        id: "gym-1",
        bId: "gym",
        name: "Cuotas de Mantenimiento",
        description: "Duplica ingresos del Power Gym.",
        icon: "mdi:dumbbell",
        cost: 100000,
        requiredLvl: 15,
        rank: 1,
        effect: (e) => {
            const b = e.getBusiness("gym");
            if (b) b.mult *= 2;
        },
    },
    {
        id: "sym-gym-pharma",
        bId: "gym",
        name: "Suscripción Médica",
        description: "Sinergia: Gym + Farma. x10 ingresos Gym.",
        icon: "mdi:shield-plus",
        cost: 2500000,
        requiredLvl: 50,
        otherReq: { bId: "pharmacy", lvl: 10 },
        rank: 2,
        effect: (e) => {
            const b = e.getBusiness("gym");
            if (b) b.mult *= 10;
        },
    },
    {
        id: "real-1",
        bId: "real-estate",
        name: "Fondos Buitre",
        description: "Duplica ingresos de la Inmobiliaria.",
        icon: "mdi:city",
        cost: 500000,
        requiredLvl: 10,
        rank: 1,
        effect: (e) => {
            const b = e.getBusiness("real-estate");
            if (b) b.mult *= 2;
        },
    },
    {
        id: "sym-real-rent",
        bId: "real-estate",
        name: "Alquiler Social de Deuda",
        description: "Sinergia: Inmobiliaria + Bazar. x5 ingresos Inmobiliaria.",
        icon: "mdi:home-group",
        cost: 2000000,
        requiredLvl: 30,
        otherReq: { bId: "rent-shop", lvl: 100 },
        rank: 2,
        effect: (e) => {
            const b = e.getBusiness("real-estate");
            if (b) b.mult *= 5;
        },
    },
    {
        id: "cortex-1",
        bId: "cortex",
        name: "Algoritmos Predictivos",
        description: "Duplica ingresos de Cortex Network.",
        icon: "mdi:brain",
        cost: 5000000,
        requiredLvl: 15,
        rank: 1,
        effect: (e) => {
            const b = e.getBusiness("cortex");
            if (b) b.mult *= 2;
        },
    },
    {
        id: "sym-corp-cortex",
        bId: "megacorp",
        name: "Red de Control Total",
        description: "Sinergia: OmniCorp + Cortex. x20 ingresos OmniCorp.",
        icon: "mdi:vector-combine",
        cost: 50000000000,
        requiredLvl: 10,
        otherReq: { bId: "cortex", lvl: 100 },
        rank: 1,
        effect: (e) => {
            const b = e.getBusiness("megacorp");
            if (b) b.mult *= 20;
        },
    },
    {
        id: "omni-1",
        bId: "megacorp",
        name: "Monopolio de Facto",
        description: "Duplica ingresos de OmniCorp.",
        icon: "mdi:domain",
        cost: 4000000000,
        requiredLvl: 50,
        rank: 2,
        effect: (e) => {
            const b = e.getBusiness("megacorp");
            if (b) b.mult *= 2;
        },
    },
    {
        id: "sym-log-food",
        bId: "logistics",
        name: "Cadena de Suministro Fría",
        description: "Sinergia: Logística + Comida. x3 ingresos Logística.",
        icon: "mdi:truck-snowflake",
        cost: 30000000,
        requiredLvl: 20,
        otherReq: { bId: "fast-food", lvl: 100 },
        rank: 1,
        effect: (e) => {
            const b = e.getBusiness("logistics");
            if (b) b.mult *= 3;
        },
    },
    {
        id: "sym-pharma-bioma",
        bId: "pharmacy",
        name: "Laboratorios de Arkología",
        description: "Sinergia: Pharma + Arkología. x10 ingresos Pharma.",
        icon: "mdi:flask-round-bottom",
        cost: 500000000,
        requiredLvl: 20,
        otherReq: { bId: "arkology", lvl: 5 },
        rank: 1,
        effect: (e) => {
            const b = e.getBusiness("pharmacy");
            if (b) b.mult *= 10;
        },
    },
    {
        id: "fusion-1",
        bId: "fusion",
        name: "Estrella de Bolsillo",
        description: "Duplica ingresos de los Núcleos de Fusión.",
        icon: "mdi:star-four-points",
        cost: 1000000000000,
        requiredLvl: 10,
        rank: 1,
        effect: (e) => {
            const b = e.getBusiness("fusion");
            if (b) b.mult *= 2;
        },
    },
    {
        id: "sym-fusion-sat",
        bId: "fusion",
        name: "Energía Orbital",
        description: "Sinergia: Fusión + Satélites. x5 ingresos Fusión.",
        icon: "mdi:satellite-uplink",
        cost: 5000000000000,
        requiredLvl: 25,
        otherReq: { bId: "satellite", lvl: 50 },
        rank: 2,
        effect: (e) => {
            const b = e.getBusiness("fusion");
            if (b) b.mult *= 5;
        },
    },
];
