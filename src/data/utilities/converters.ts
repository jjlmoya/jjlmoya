import type { SectionData } from "./types";
import {
    convertersCategory,
    pngAJpg, jpgAPng, webpAPng, webpAJpg, pngAWebp, jpgAWebp,
    svgAPng, svgAJpg, imagenBase64,
    bmpAJpg, bmpAPng, bmpAWebp,
    avifAJpg, avifAPng, avifAWebp,
    gifAJpg, gifAPng, gifAWebp,
    pngAIco, jpgAIco, webpAIco,
} from '@jjlmoya/utils-converters';

const LOCALE = 'es';

const [
    pngAJpgContent, jpgAPngContent, webpAPngContent, webpAJpgContent,
    pngAWebpContent, jpgAWebpContent, svgAPngContent, svgAJpgContent,
    imagenBase64Content, bmpAJpgContent, bmpAPngContent, bmpAWebpContent,
    avifAJpgContent, avifAPngContent, avifAWebpContent,
    gifAJpgContent, gifAPngContent, gifAWebpContent,
    pngAIcoContent, jpgAIcoContent, webpAIcoContent,
] = await Promise.all([
    pngAJpg.i18n[LOCALE]!(), jpgAPng.i18n[LOCALE]!(), webpAPng.i18n[LOCALE]!(), webpAJpg.i18n[LOCALE]!(),
    pngAWebp.i18n[LOCALE]!(), jpgAWebp.i18n[LOCALE]!(), svgAPng.i18n[LOCALE]!(), svgAJpg.i18n[LOCALE]!(),
    imagenBase64.i18n[LOCALE]!(), bmpAJpg.i18n[LOCALE]!(), bmpAPng.i18n[LOCALE]!(), bmpAWebp.i18n[LOCALE]!(),
    avifAJpg.i18n[LOCALE]!(), avifAPng.i18n[LOCALE]!(), avifAWebp.i18n[LOCALE]!(),
    gifAJpg.i18n[LOCALE]!(), gifAPng.i18n[LOCALE]!(), gifAWebp.i18n[LOCALE]!(),
    pngAIco.i18n[LOCALE]!(), jpgAIco.i18n[LOCALE]!(), webpAIco.i18n[LOCALE]!(),
]);

export const converterSection: SectionData = {
    title: "Convertidores de Imagen",
    slug: "convertidores-imagen",
    icon: convertersCategory.icon,
    theme: "indigo",
    utilities: [
        { href: "/utilidades/convertidor-png-a-jpg/", iconBg: pngAJpg.icons.bg, iconFg: pngAJpg.icons.fg, title: pngAJpgContent.title, description: pngAJpgContent.description, color: "#6366f1" },
        { href: "/utilidades/convertidor-jpg-a-png/", iconBg: jpgAPng.icons.bg, iconFg: jpgAPng.icons.fg, title: jpgAPngContent.title, description: jpgAPngContent.description, color: "#4f46e5" },
        { href: "/utilidades/convertidor-webp-a-png/", iconBg: webpAPng.icons.bg, iconFg: webpAPng.icons.fg, title: webpAPngContent.title, description: webpAPngContent.description, color: "#4338ca" },
        { href: "/utilidades/convertidor-webp-a-jpg/", iconBg: webpAJpg.icons.bg, iconFg: webpAJpg.icons.fg, title: webpAJpgContent.title, description: webpAJpgContent.description, color: "#3730a3" },
        { href: "/utilidades/convertidor-png-a-webp/", iconBg: pngAWebp.icons.bg, iconFg: pngAWebp.icons.fg, title: pngAWebpContent.title, description: pngAWebpContent.description, color: "#312e81" },
        { href: "/utilidades/convertidor-jpg-a-webp/", iconBg: jpgAWebp.icons.bg, iconFg: jpgAWebp.icons.fg, title: jpgAWebpContent.title, description: jpgAWebpContent.description, color: "#1e1b4b" },
        { href: "/utilidades/convertidor-svg-a-png/", iconBg: svgAPng.icons.bg, iconFg: svgAPng.icons.fg, title: svgAPngContent.title, description: svgAPngContent.description, color: "#6366f1" },
        { href: "/utilidades/convertidor-svg-a-jpg/", iconBg: svgAJpg.icons.bg, iconFg: svgAJpg.icons.fg, title: svgAJpgContent.title, description: svgAJpgContent.description, color: "#4f46e5" },
        { href: "/utilidades/convertidor-imagen-base64/", iconBg: imagenBase64.icons.bg, iconFg: imagenBase64.icons.fg, title: imagenBase64Content.title, description: imagenBase64Content.description, color: "#0ea5e9" },
        { href: "/utilidades/convertidor-bmp-a-jpg/", iconBg: bmpAJpg.icons.bg, iconFg: bmpAJpg.icons.fg, title: bmpAJpgContent.title, description: bmpAJpgContent.description, color: "#0284c7" },
        { href: "/utilidades/convertidor-bmp-a-png/", iconBg: bmpAPng.icons.bg, iconFg: bmpAPng.icons.fg, title: bmpAPngContent.title, description: bmpAPngContent.description, color: "#f59e0b" },
        { href: "/utilidades/convertidor-bmp-a-webp/", iconBg: bmpAWebp.icons.bg, iconFg: bmpAWebp.icons.fg, title: bmpAWebpContent.title, description: bmpAWebpContent.description, color: "#059669" },
        { href: "/utilidades/convertidor-avif-a-jpg/", iconBg: avifAJpg.icons.bg, iconFg: avifAJpg.icons.fg, title: avifAJpgContent.title, description: avifAJpgContent.description, color: "#0ea5e9" },
        { href: "/utilidades/convertidor-avif-a-png/", iconBg: avifAPng.icons.bg, iconFg: avifAPng.icons.fg, title: avifAPngContent.title, description: avifAPngContent.description, color: "#8b5cf6" },
        { href: "/utilidades/convertidor-avif-a-webp/", iconBg: avifAWebp.icons.bg, iconFg: avifAWebp.icons.fg, title: avifAWebpContent.title, description: avifAWebpContent.description, color: "#10b981" },
        { href: "/utilidades/convertidor-gif-a-jpg/", iconBg: gifAJpg.icons.bg, iconFg: gifAJpg.icons.fg, title: gifAJpgContent.title, description: gifAJpgContent.description, color: "#eab308" },
        { href: "/utilidades/convertidor-gif-a-png/", iconBg: gifAPng.icons.bg, iconFg: gifAPng.icons.fg, title: gifAPngContent.title, description: gifAPngContent.description, color: "#db2777" },
        { href: "/utilidades/convertidor-gif-a-webp/", iconBg: gifAWebp.icons.bg, iconFg: gifAWebp.icons.fg, title: gifAWebpContent.title, description: gifAWebpContent.description, color: "#4f46e5" },
        { href: "/utilidades/convertidor-png-a-ico/", iconBg: pngAIco.icons.bg, iconFg: pngAIco.icons.fg, title: pngAIcoContent.title, description: pngAIcoContent.description, color: "#0ea5e9" },
        { href: "/utilidades/convertidor-jpg-a-ico/", iconBg: jpgAIco.icons.bg, iconFg: jpgAIco.icons.fg, title: jpgAIcoContent.title, description: jpgAIcoContent.description, color: "#8b5cf6" },
        { href: "/utilidades/convertidor-webp-a-ico/", iconBg: webpAIco.icons.bg, iconFg: webpAIco.icons.fg, title: webpAIcoContent.title, description: webpAIcoContent.description, color: "#10b981" },
    ],
};
