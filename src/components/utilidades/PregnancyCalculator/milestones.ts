export interface Milestone {
    analogies: { fruits: string; geek: string; sweets: string };
    size: string;
    biolook: string;
    mom: string;
    partner: string;
    symptoms: string[];
    alerts: string[];
    wonder: string;
}

export const milestones: Record<number, Milestone> = {
    4: {
        analogies: { fruits: "Semilla de amapola", geek: "Píxel solitario", sweets: "Granito de azúcar" },
        size: "~1 mm",
        biolook: "El blastocisto se implanta en el endometrio. Aparecen las tres capas embrionarias que formarán todos tus órganos.",
        mom: "Tu cuerpo aún no 'sabe' que está embarazada, pero ya produce hCG. Quizá sientas un leve sangrado de implantación.",
        partner: "Puede que ella esté más cansada de lo habitual sin saber por qué. Es buen momento para cocinar su cena favorita.",
        symptoms: ["Fatiga temprana", "Tensión en el pecho", "Ligero sangrado de implantación"],
        alerts: ["Sangrado abundante rojo", "Dolor pélvico agudo", "Fiebre mayor de 38°"],
        wonder: "En este momento se decide si habrá uno o dos bebés."
    },
    6: {
        analogies: { fruits: "Lenteja", geek: "LED parpadeante", sweets: "Lacasito" },
        size: "~6 mm",
        biolook: "El corazón empieza a latir de forma irregular pero visible en ecografía. El tubo neural se cierra.",
        mom: "Las náuseas matutinas —que también llegan a mediodía y noche— pueden comenzar ahora.",
        partner: "El olfato de ella se vuelve sobrehumano. Evita perfumes fuertes y cocinar pescado en casa.",
        symptoms: ["Náuseas", "Hipersensibilidad al olfato", "Somnolencia extrema"],
        alerts: ["Ausencia de latido en eco vaginal", "Manchado oscuro persistente", "Vómitos sin retención"],
        wonder: "Ya tiene la misma estructura cerebral básica que tendrá de adulto."
    },
    8: {
        analogies: { fruits: "Frambuesa", geek: "Memoria USB nano", sweets: "Gominola de oso" },
        size: "~18 mm",
        biolook: "Los dedos de manos y pies se separan. Los párpados cubren los ojos. El corazón late 150-170 veces por minuto.",
        mom: "Tu útero tiene el tamaño de un pomelo. Las náuseas están en su punto álgido. El cansancio puede ser agotador.",
        partner: "Ella puede necesitar dormir 10-12 horas. No es pereza, es una obra de ingeniería en marcha. Asume las tareas del hogar sin que te lo pida.",
        symptoms: ["Náuseas intensas", "Aumento de saliva", "Micción muy frecuente"],
        alerts: ["Vómitos incoercibles (hiperemesis)", "Manchado oscuro", "Dolor lumbar intenso"],
        wonder: "Si tocas la barriga de ella, él ya reacciona y se mueve —aunque ella aún no lo siente."
    },
    10: {
        analogies: { fruits: "Kumquat", geek: "AirPod", sweets: "Macarón" },
        size: "~31 mm",
        biolook: "Técnicamente ya es un feto. Todos los órganos existen en forma rudimentaria. Las uñas empiezan a crecer.",
        mom: "Tu cintura empieza a ensancharse. La ropa interior aprieta. Es el momento del sujetador de maternidad.",
        partner: "Acompáñala a la primera consulta del primer trimestre. Ver el latido juntos es un momento que nunca olvidaréis.",
        symptoms: ["Hinchazón abdominal", "Cambios bruscos de humor", "Piel más sensible al sol"],
        alerts: ["Pérdida de líquido claro", "Calambres uterinos intensos", "Fiebre sin causa aparente"],
        wonder: "Ya tiene su propio tipo de sangre, diferente al de su madre."
    },
    12: {
        analogies: { fruits: "Ciruela", geek: "Ratón inalámbrico", sweets: "Mochi de fresa" },
        size: "~55 mm",
        biolook: "Los órganos principales están formados. El bebé empieza a practicar movimientos de deglución.",
        mom: "El riesgo de aborto espontáneo cae drásticamente. Es el momento del Triple Screening y la ecografía de la translucencia nucal.",
        partner: "El segundo trimestre se acerca, con él llega el famoso 'honeymoon trimestre'. El cansancio de ella mejorará pronto.",
        symptoms: ["Reducción de las náuseas", "Piel más luminosa o con manchas", "Dolores de cabeza"],
        alerts: ["Pérdida de líquido", "Calambres fuertes", "Fiebre persistente"],
        wonder: "Sus reflejos ya funcionan: si le tocas la palma de la mano, cierra el puño."
    },
    16: {
        analogies: { fruits: "Aguacate", geek: "Mando de PS5", sweets: "Berlina de chocolate" },
        size: "~12 cm",
        biolook: "Las orejas están en su posición final. El esqueleto de cartílago se convierte en hueso. Ya puede fruncir el ceño.",
        mom: "Muchas mamás sienten los primeros movimientos (mariposas en el estómago). La energía vuelve.",
        partner: "Puede que empiece a sentir pequeños movimientos. Si ella te coge la mano y la pone en la barriga, quédate quieto y espera.",
        symptoms: ["Ardor de estómago leve", "Congestión nasal", "Sueños muy vividos"],
        alerts: ["Ausencia total de movimientos fetales (si ya los sentías)", "Tensión alta", "Sangrado vaginal"],
        wonder: "Si es niña, ya tiene 6 millones de óvulos en sus ovarios."
    },
    20: {
        analogies: { fruits: "Plátano", geek: "Consola de juegos portátil", sweets: "Tarta de queso entera" },
        size: "~25 cm",
        biolook: "El bebé ya oye tu voz con claridad. Se chupa el dedo. Está cubierto de vérnix, una crema blanca protectora.",
        mom: "¡Semana 20, ecuador! Es el momento de la ecografía morfológica, donde se revisan todos sus órganos con detalle.",
        partner: "Habla al bebé. Ya te oye. Pon tu boca cerca de la barriga y dile tu nombre. Él ya te reconocerá al nacer.",
        symptoms: ["Ardor de estómago frecuente", "Hinchazón de pies al final del día", "Picor en la piel del abdomen"],
        alerts: ["Falta de movimientos fetales", "Tensión arterial alta sostenida", "Visión borrosa o con destellos"],
        wonder: "Sus huellas dactilares ya están completas y son únicas en el universo."
    },
    24: {
        analogies: { fruits: "Mazorca de maíz", geek: "Teclado mecánico", sweets: "Donut gigante" },
        size: "~30 cm",
        biolook: "Los pulmones producen surfactante, la sustancia que los mantendrá inflados al nacer. Los ojos empiezan a abrirse.",
        mom: "Tu útero llega al ombligo. La espalda puede empezar a resentirse con la nueva postura que adoptará tu cuerpo.",
        partner: "Aprende los signos de parto pretérmino. La preparación es la mejor forma de apoyarla ahora.",
        symptoms: ["Dolor de espalda baja", "Calambres en las piernas por la noche", "Línea negra en el abdomen"],
        alerts: ["Contracciones regulares antes de la semana 37", "Pérdida de líquido amniótico", "Sangrado vaginal"],
        wonder: "Si nace ahora, con cuidados intensivos, tiene posibilidades de sobrevivir."
    },
    28: {
        analogies: { fruits: "Berenjena", geek: "Tableta gráfica", sweets: "Tarta de tres pisos" },
        size: "~37 cm",
        biolook: "El bebé abre y cierra los ojos. Tiene ciclos de sueño y vigilia. Reconoce la voz de sus padres.",
        mom: "Empieza el tercer trimestre. La prueba de glucosa (test O'Sullivan) es ahora. El sueño se complica.",
        partner: "El insomnio puede agotarla. Si ella no puede dormir, no te quedes durmiendo como un tronco. Acompáñala.",
        symptoms: ["Insomnio y dificultad para encontrar postura", "Hinchazón de manos y pies", "Contracciones Braxton Hicks esporádicas"],
        alerts: ["Reducción marcada de movimientos fetales", "Dolor de cabeza intenso que no cede", "Visión con luces o moscas"],
        wonder: "Ya tiene un sabor favorito, el del líquido amniótico cambia con lo que ella come."
    },
    32: {
        analogies: { fruits: "Calabaza mediana", geek: "Teclado de 60%", sweets: "Caja de bombones entera" },
        size: "~42 cm",
        biolook: "Practica la respiración. Sus pulmones están casi listos para el mundo exterior. Acumula grasa bajo la piel.",
        mom: "Recuperar el aliento es difícil. El bebé presiona el diafragma. Las visitas al baño son cada dos horas, incluso de noche.",
        partner: "Prepara la bolsa del hospital. No como tarea de ella, como proyecto tuyo. Sorpréndela con ella lista.",
        symptoms: ["Falta de aliento al esfuerzo mínimo", "Hemorroides", "Pérdida de orina al reír o toser"],
        alerts: ["Picor intenso en palmas de manos y plantas de pies (puede ser colestasis)", "Contracciones regulares", "Dolor en boca del estómago con náuseas"],
        wonder: "Ya gira la cabeza hacia la luz que atraviesa la barriga de su madre."
    },
    36: {
        analogies: { fruits: "Melón cantalupo", geek: "Portátil de 15'", sweets: "Tarta de cumpleaños" },
        size: "~47 cm",
        biolook: "El bebé suele encajarse cabeza abajo (presentación cefálica). Sus pulmones están casi maduros.",
        mom: "Sientes presión en la pelvis al encajarse el bebé. Paradójicamente, respiras mejor porque ya no presiona el diafragma.",
        partner: "El plan de parto debería estar listo. Léelo tú también, porque en el momento del parto ella te necesitará como portavoz.",
        symptoms: ["Presión pélvica intensa", "Vuelta del ardor de estómago", "Ansiedad anticipatoria"],
        alerts: ["Rotura de bolsa (líquido claro y abundante)", "Sangrado vaginal rojo", "Ausencia de movimientos fetales"],
        wonder: "Ya tiene las uñas tan largas que podría arañarse al nacer."
    },
    40: {
        analogies: { fruits: "Sandía", geek: "PC de sobremesa completo", sweets: "Tarta nupcial de 3 pisos" },
        size: "~50 cm",
        biolook: "¡Todo está listo! Sus reflejos están coordinados, sus pulmones maduros, su cerebro activo.",
        mom: "El cansancio es máximo. Cada visita al baño, cada postura para dormir, cada paso es un esfuerzo heroico. Eres increíble.",
        partner: "Hoy puede que sea el día. O mañana. O en una semana. Mantén el teléfono cargado y la calma que ella necesita de ti.",
        symptoms: ["Presión pélvica muy intensa", "Pérdida del tapón mucoso", "Contracciones irregulares (pródromo)"],
        alerts: ["Contracciones regulares cada 5 minutos durante 1 hora", "Rotura de bolsa", "Ausencia de movimientos"],
        wonder: "Su cerebro ha creado 100 mil millones de neuronas durante estos 9 meses."
    }
};

export const timelineLabels: Record<number, string> = {
    4: "Implantación", 5: "Latido", 6: "Corazón late", 7: "Ojos y oídos",
    8: "Dedos", 9: "Uñas", 10: "Ya es feto", 11: "Movimientos",
    12: "Triple Screening", 13: "2º Trimestre", 14: "Cuello de útero", 15: "Patadas",
    16: "Oye voces", 17: "Grasa corporal", 18: "Genitales visibles", 19: "Vérnix",
    20: "Eco morfológica", 21: "Huellas dactilares", 22: "Labios formados", 23: "Párpados",
    24: "Ojos se abren", 25: "Capilares", 26: "Reflejos", 27: "Cerebro activo",
    28: "3er Trimestre", 29: "Huesos fuertes", 30: "Médula ósea", 31: "Surfactante",
    32: "Practica respirar", 33: "Inmunidad", 34: "Sistema nervioso", 35: "Encajamiento",
    36: "Pulmones maduros", 37: "A término", 38: "Preparado", 39: "Esperando", 40: "¡Llegó el día!"
};

export const getMilestone = (week: number): Milestone => {
    const keys = Object.keys(milestones).map(Number).sort((a, b) => b - a);
    for (const k of keys) {
        if (week >= k) return milestones[k];
    }
    return milestones[4];
};
