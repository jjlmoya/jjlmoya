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
        }
    ]
};
