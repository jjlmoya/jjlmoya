export interface Vaccine {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  doses: number[];
}

export const VACCINES: Vaccine[] = [
  {
    id: "hexavalente",
    name: "Hexavalente",
    description: "Difteria, Tétanos, Tosferina, Polio, Hib y Hepatitis B.",
    fullDescription: "Protege contra seis enfermedades graves en una sola inyección: Difteria, Tétanos, Tosferina (tos ferina), Poliomielitis, Haemophilus influenzae tipo b y Hepatitis B.",
    doses: [2, 4, 11]
  },
  {
    id: "neumococo",
    name: "Neumococo (VCN15/20)",
    description: "Protección contra neumonía y meningitis neumocócica.",
    fullDescription: "La vacuna neumocócica conjugada protege contra cepas de la bacteria Streptococcus pneumoniae, causantes de neumonía, otitis y meningitis.",
    doses: [2, 4, 11]
  },
  {
    id: "meningococo_b",
    name: "Meningococo B (Bexsero)",
    description: "Protección contra la meningitis por serogrupo B.",
    fullDescription: "Protege contra la enfermedad meningocócica invasiva causada por Neisseria meningitidis del serogrupo B, una causa principal de meningitis y sepsis en niños.",
    doses: [2, 4, 12]
  },
  {
    id: "rotavirus",
    name: "Rotavirus",
    description: "Protección contra gastroenteritis aguda por rotavirus.",
    fullDescription: "Vacuna oral que previene la diarrea grave y vómitos causados por el rotavirus, muy contagioso en lactantes y niños pequeños.",
    doses: [2, 3, 4]
  },
  {
    id: "meningococo_acwy",
    name: "Meningococo ACWY",
    description: "Protección contra meningitis por serogueropos A, C, W e Y.",
    fullDescription: "Refuerza la protección contra cuatro variedades de meningitis meningocócica. Se administra en el primer año y en la adolescencia.",
    doses: [4, 12, 144]
  },
  {
    id: "triple_virica",
    name: "Triple Vírica (SRP)",
    description: "Sarampión, Rubeola y Parotiditis.",
    fullDescription: "Protege contra tres virus comunes: Sarampión (fiebre y erupción), Rubeola (afecta al feto en embarazadas) y Parotiditis (paperas).",
    doses: [12, 48]
  },
  {
    id: "varicela",
    name: "Varicela",
    description: "Protección contra el virus de la varicela-zóster.",
    fullDescription: "Previene la varicela y sus complicaciones graves. Se administran dos dosis para una inmunidad duradera.",
    doses: [15, 48]
  },
  {
    id: "gripe",
    name: "Gripe (Estacional)",
    description: "Vacunación estacional contra la gripe.",
    fullDescription: "Se recomienda anualmente entre los 6 y 59 meses. El calendario calcula una ventana teórica, contacta con tu pediatra en otoño.",
    doses: [6, 18, 30, 42, 54]
  },
  {
    id: "vph",
    name: "VPH (Papiloma)",
    description: "Prevención del cáncer de cuello de útero y otros.",
    fullDescription: "Protege contra el Virus del Papiloma Humano, previniendo diversos tipos de cáncer y verrugas genitales en ambos sexos.",
    doses: [144]
  },
  {
    id: "tdpa",
    name: "Tdpa (Tétanos, Difteria, Tosferina)",
    description: "Refuerzo de adolescente.",
    fullDescription: "Refuerzo inmunológico crucial para mantener la protección contra estas tres enfermedades durante la adolescencia y edad adulta.",
    doses: [72, 144]
  },
  {
    id: "polio_booster",
    name: "Polio (Refuerzo)",
    description: "Cuarta dosis de refuerzo.",
    fullDescription: "Dosis final para asegurar protección permanente de por vida contra la poliomielitis.",
    doses: [72]
  }
];
