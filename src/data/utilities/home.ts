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
        },
        {
            href: "/utilidades/veracidad-textil/",
            iconBg: "mdi:tag-text-outline",
            iconFg: "mdi:microscope",
            title: "Veracidad Textil",
            description: "¿Calidad o plástico? Analiza la etiqueta de tu ropa.",
            color: "#6366f1"
        },
        {
            href: "/utilidades/guia-lavado-textil/",
            iconBg: "mdi:washing-machine",
            iconFg: "mdi:water-check",
            title: "Maestro Textil",
            description: "Guía científica para lavar y cuidar cada tipo de fibra.",
            color: "#3b82f6"
        }
    ]
};
