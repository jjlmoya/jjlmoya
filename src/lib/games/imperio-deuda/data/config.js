export const gameConfig = {
    businesses: [
        { id: "rent-shop", name: "Bazar de Deuda", description: "Venta de créditos rápidos.", icon: "mdi:store-outline", baseCost: 15, baseIncome: 1, allowedOn: "block" },
        { id: "fast-food", name: "Fast Cash Food", description: "Comida adictiva y cara.", icon: "mdi:food-burger", baseCost: 100, baseIncome: 5, allowedOn: "block" },
        { id: "laundry", name: "Lavandería Automática", description: "Limpieza de activos.", icon: "mdi:washing-machine", baseCost: 1100, baseIncome: 45, allowedOn: "block" },
        { id: "gym", name: "Power Gym", description: "Suscripciones obligatorias.", icon: "mdi:dumbbell", baseCost: 12000, baseIncome: 240, allowedOn: "block" },
        { id: "real-estate", name: "Inmobiliaria City", description: "Rentas de lujo superior.", icon: "mdi:office-building", baseCost: 130000, baseIncome: 1100, allowedOn: "block" },
        { id: "cortex", name: "Cortex Network", description: "Control del flujo de datos.", icon: "mdi:brain", baseCost: 1400000, baseIncome: 5500, allowedOn: "block" },
        { id: "logistics", name: "Lógica Global", description: "Logística de flujos masivos.", icon: "mdi:truck-delivery", baseCost: 15000000, baseIncome: 28000, allowedOn: "road" },
        { id: "pharmacy", name: "Pharma-Fix", description: "Salud bajo suscripción.", icon: "mdi:medical-bag", baseCost: 170000000, baseIncome: 130000, allowedOn: "block" },
        { id: "megacorp", name: "OmniCorp Inc.", description: "Dominio sectorial total.", icon: "mdi:domain", baseCost: 1900000000, baseIncome: 650000, allowedOn: "block" },
        { id: "satellite", name: "Star-Linker", description: "Comunicaciones orbitales.", icon: "mdi:satellite-variant", baseCost: 22000000000, baseIncome: 3200000, allowedOn: "block" },
        { id: "fusion", name: "Núcleos de Fusión", description: "Energía infinita, precio finito.", icon: "mdi:atom", baseCost: 250000000000, baseIncome: 18000000, allowedOn: "block" },
        { id: "arkology", name: "Arcología Gaia", description: "Hábitats autosuficientes.", icon: "mdi:city-variant-outline", baseCost: 3000000000000, baseIncome: 120000000, allowedOn: "block" }
    ],



    operations: [
        { id: "pay-1k", type: "payment", name: "Abono 1K", description: "Liquida 1.000 de deuda (1:1).", cost: 1000, effect: (e) => e.debt.sub(1000) },
        { id: "pay-10k", type: "payment", name: "Abono 10K", description: "Liquida 10.000 de deuda (1:1).", cost: 10000, effect: (e) => e.debt.sub(10000) },
        { id: "pay-100k", type: "payment", name: "Abono 100K", description: "Liquida 100.000 de deuda (1:1).", cost: 100000, effect: (e) => e.debt.sub(100000) },
        { id: "pay-1m", type: "payment", name: "Pago Millonario", description: "Liquida 1.000.000 de deuda (1:1).", cost: 1000000, effect: (e) => e.debt.sub(1000000) },
        { id: "pay-10m", type: "payment", name: "Pago 10M", description: "Liquida 10.000.000 de deuda (1:1).", cost: 10000000, effect: (e) => e.debt.sub(10000000) },
        { id: "pay-100m", type: "payment", name: "Pago 100M", description: "Liquida 100.000.000 de deuda (1:1).", cost: 100000000, effect: (e) => e.debt.sub(100000000) },
        { id: "pay-1b", type: "payment", name: "Pago Billonario", description: "Liquida 1.000.000.000 de deuda (1:1).", cost: 1000000000, effect: (e) => e.debt.sub(1000000000) },
        { id: "pay-10b", type: "payment", name: "Pago 10B", description: "Liquida 10.000.000.000 de deuda (1:1).", cost: 10000000000, effect: (e) => e.debt.sub(10000000000) },
        { id: "pay-100b", type: "payment", name: "Pago 100B", description: "Liquida 100.000.000.000 de deuda (1:1).", cost: 100000000000, effect: (e) => e.debt.sub(100000000000) },
        { id: "pay-1t", type: "payment", name: "Pago Trillonario", description: "Liquida 1.000.000.000.000 de deuda (1:1).", cost: 1000000000000, effect: (e) => e.debt.sub(1000000000000) },

        { id: "op-restruct", name: "Reestructuración", description: "Paga 100K para reducir intereses un 5%.", cost: 100000, effect: (e) => { e.debtGrowthRate *= 0.95; } },
        { id: "op-reset", name: "Amago de Quiebra", description: "Resetea intereses básicos al 50% de tu banco.", cost: 0, effect: (e) => { e.bank.value *= 0.5; e.debtGrowthRate = 0.0005; } }
    ]
};
