import type { SectionData } from "./types";

export const homeSection: SectionData = {
    title: "Hogar",
    icon: "mdi:home",
    theme: "purple",
    utilities: [
        {
            href: "/utilidades/qr/",
            iconBg: "mdi:qrcode",
            iconFg: "mdi:wifi-lock",
            title: "Generador QR Offline",
            description: "Crea QRs para WiFi, Contactos y URLs. 100% Privado.",
            color: "#2563eb",
        },
        {
            href: "/utilidades/calculadora-solar/",
            iconBg: "mdi:solar-power",
            iconFg: "mdi:angle-acute",
            title: "Calculadora Solar",
            description: "Ángulo de inclinación óptimo para placas solares según tu latitud.",
            color: "#f59e0b",
        },
        {
            href: "/utilidades/calculadora-tiro-proyector/",
            iconBg: "mdi:projector",
            iconFg: "mdi:video-input-component",
            title: "Calculadora Distancia Proyector",
            description: "Calcula dónde poner el proyector según las pulgadas de pantalla.",
            color: "#06b6d4",
        },
        {
            href: "/utilidades/punto-de-rocio/",
            iconBg: "mdi:water-thermometer",
            iconFg: "mdi:bacteria",
            title: "Punto de Rocío",
            description: "Calcula la temperatura de condensación para evitar moho en casa.",
            color: "#a855f7",
        },
        {
            href: "/utilidades/comparador-consumo-gas-aerotermia-aire/",
            iconBg: "mdi:home-lightning-bolt",
            iconFg: "mdi:finance",
            title: "Gas vs. Aerotermia",
            description: "Compara el consumo anual y ahorro entre Gas, Aerotermia y Bomba de Calor.",
            color: "#6366f1",
        },
        {
            href: "/utilidades/calculadora-ahorro-led/",
            iconBg: "mdi:lightbulb-on",
            iconFg: "mdi:cash-multiple",
            title: "Calculadora Ahorro LED",
            description: "¿Cuánto ahorras si cambias tus bombillas a LED? Calcula euros y kWh.",
            color: "#f59e0b",
        },
    ],
};
