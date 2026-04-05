import type { SectionData } from "./types";
import {
    audiovisualCategory,
    timelapseCalculator, exifCleaner, subtitleSync, privacyBlur,
    chromaticLens, printQualityCalculator, tvDistance,
    imageCompressor, collageMaker, videoFrameExtractor,
} from '@jjlmoya/utils-audiovisual';

const LOCALE = 'es';

const [
    timelapseContent, exifContent, subtitleContent, privacyContent,
    chromaticContent, printContent, tvContent,
    imageCompressorContent, collageContent, videoFrameContent,
] = await Promise.all([
    timelapseCalculator.i18n[LOCALE]!(),
    exifCleaner.i18n[LOCALE]!(),
    subtitleSync.i18n[LOCALE]!(),
    privacyBlur.i18n[LOCALE]!(),
    chromaticLens.i18n[LOCALE]!(),
    printQualityCalculator.i18n[LOCALE]!(),
    tvDistance.i18n[LOCALE]!(),
    imageCompressor.i18n[LOCALE]!(),
    collageMaker.i18n[LOCALE]!(),
    videoFrameExtractor.i18n[LOCALE]!(),
]);

export const audiovisualSection: SectionData = {
    title: "Audiovisual y Fotografía",
    slug: "audiovisual",
    icon: audiovisualCategory.icon,
    theme: "purple",
    utilities: [
        { href: "/utilidades/calculadora-timelapse/", iconBg: timelapseCalculator.icons.bg, iconFg: timelapseCalculator.icons.fg, title: timelapseContent.title, description: timelapseContent.description, color: "#8b5cf6" },
        { href: "/utilidades/limpiador-exif/", iconBg: exifCleaner.icons.bg, iconFg: exifCleaner.icons.fg, title: exifContent.title, description: exifContent.description, color: "#6b21a8" },
        { href: "/utilidades/sincronizar-subtitulos/", iconBg: subtitleSync.icons.bg, iconFg: subtitleSync.icons.fg, title: subtitleContent.title, description: subtitleContent.description, color: "#06b6d4" },
        { href: "/utilidades/editor-privacidad/", iconBg: privacyBlur.icons.bg, iconFg: privacyBlur.icons.fg, title: privacyContent.title, description: privacyContent.description, color: "#64748b" },
        { href: "/utilidades/lente-cromatica/", iconBg: chromaticLens.icons.bg, iconFg: chromaticLens.icons.fg, title: chromaticContent.title, description: chromaticContent.description, color: "#d946ef" },
        { href: "/utilidades/calculadora-calidad-impresion/", iconBg: printQualityCalculator.icons.bg, iconFg: printQualityCalculator.icons.fg, title: printContent.title, description: printContent.description, color: "#6366f1" },
        { href: "/utilidades/distancia-tv/", iconBg: tvDistance.icons.bg, iconFg: tvDistance.icons.fg, title: tvContent.title, description: tvContent.description, color: "#2563eb" },
        { href: "/utilidades/compresor-imagenes/", iconBg: imageCompressor.icons.bg, iconFg: imageCompressor.icons.fg, title: imageCompressorContent.title, description: imageCompressorContent.description, color: "#10b981" },
        { href: "/utilidades/creador-collage-fotos/", iconBg: collageMaker.icons.bg, iconFg: collageMaker.icons.fg, title: collageContent.title, description: collageContent.description, color: "#a855f7" },
        { href: "/utilidades/extractor-frames-video/", iconBg: videoFrameExtractor.icons.bg, iconFg: videoFrameExtractor.icons.fg, title: videoFrameContent.title, description: videoFrameContent.description, color: "#6366f1" },
    ],
};
