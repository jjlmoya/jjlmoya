const MESSAGES = [
    {id: 1, text:'¡Buenas!, Hoy seré tu ayudante, pero no te frustres, sólo soy un Bot 🤖', default: true },
    {id: 2, text:'He configurado por defecto el módo preguntas automáticas para ofrecerte una mejor experiencia', default: true },
    {id: 3, text:'¿En que puedo ayudarte hoy?', default: true, questions: [1,2,3,4] },
    {id: 4, text:'Sí claro, pero también puedes volverlo a leer...' }
]

const QUESTIONS = [
    {id: 1, text: '¿Puedes repetirmelo?', answer: [4,1,2,3], default:'true'},
    {id: 2, text: 'Me he perdido'},
    {id: 3, text: 'Ya me iba'},
    {id: 4, text: '...'}
]

export const defaultMessages =  MESSAGES.filter(message => message.default)


export const getQuestionByMessage = (message) => {
    return message.questions
        .map(question => QUESTIONS
            .find(QUESTION => QUESTION.id === question) )
}

export const getMessageByQuestion = (message) => {
    return message.answer
        .map(answer => MESSAGES
            .find(MESSAGE => MESSAGE.id === answer) )
}

