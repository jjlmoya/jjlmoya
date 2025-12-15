import type { SectionData } from "./types";

export const homeSection: SectionData = {
    title: "Hogar",
    icon: "mdi:home",
    theme: "purple",
    utilities: [
        {
            href: "/utilidades/morteros/",
            iconBg: "mdi:wall",
            iconFg: "mdi:calculator",
            title: "Calculadora de Morteros",
            description: "Proporciones exactas de cal y arena para enfoscados y revocos.",
            color: "#a855f7"
        },
        {
            href: "/utilidades/qr/",
            iconBg: "mdi:qrcode",
            iconFg: "mdi:wifi-lock",
            title: "Generador QR Offline",
            description: "Crea QRs para WiFi, Contactos y URLs. 100% Privado.",
            color: "#2563eb"
        },
        {
            href: "/utilidades/calculadora-solar/",
            iconBg: "mdi:solar-power",
            iconFg: "mdi:angle-acute",
            title: "Calculadora Solar",
            description: "Ángulo de inclinación óptimo para placas solares según tu latitud.",
            color: "#f59e0b"
        },
        {
            href: "/utilidades/calculadora-tiro-proyector/",
            iconBg: "mdi:projector",
            iconFg: "mdi:video-input-component",
            title: "Calculadora Distancia Proyector",
            description: "Calcula dónde poner el proyector según las pulgadas de pantalla.",
            color: "#06b6d4"
        }
    ]
};
