interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  correctChars: number;
  totalChars: number;
  timeElapsed: number;
}

interface Achievement {
  name: string;
  icon: string;
  unlocked: boolean;
}

interface GameState {
  isRunning: boolean;
  isPaused: boolean;
  timeRemaining: number;
  totalTime: number;
  currentTextIndex: number;
  userInput: string;
  textToType: string;
  achievements: Achievement[];
  bestWpm: number;
}

const WORD_SETS: { [key: string]: string[] } = {
  easy: [
    "el", "la", "de", "que", "y", "a", "en", "un", "una", "ser",
    "es", "se", "no", "haber", "por", "con", "su", "para", "es", "como",
    "estar", "tener", "le", "lo", "todo", "pero", "más", "hacer", "año", "día",
    "casa", "tiempo", "parte", "ejemplo", "palabra", "persona", "noche", "mano"
  ],
  medium: [
    "programador", "tecnología", "desarrollo", "computadora", "internet", "softwares",
    "algoritmo", "función", "variable", "estructura", "método", "clase", "objeto",
    "interfaz", "patrón", "principio", "arquitectura", "desempeño", "optimización",
    "debugging", "compilador", "intérprete", "biblioteca", "framework", "servidor"
  ],
  hard: [
    "encriptación", "autenticación", "autorización", "virtualización", "orquestación",
    "paralelización", "sincronización", "abstracción", "refactorización", "compilación",
    "despliegue", "escalabilidad", "redundancia", "resiliencia", "latencia",
    "throughput", "concurrencia", "asincronía", "contención", "fragmentación",
    "indización", "normalización", "desnormalización", "replicación", "consistencia"
  ],
  code: [
    "const x = 42;", "let arr = [];", "function add(a, b) {", "if (x > 0) {",
    "for (let i = 0; i < n; i++) {", "arr.forEach(item => {", "return result;",
    "Math.sqrt(16) === 4", "typeof null === 'object'", "undefined !== null",
    "{ ...obj }", "[...arr]", "async function() {", "await Promise.all([])"
  ]
};

export const STATE: GameState = {
  isRunning: false,
  isPaused: false,
  timeRemaining: 60,
  totalTime: 60,
  currentTextIndex: 0,
  userInput: "",
  textToType: "",
  achievements: [],
  bestWpm: localStorage.getItem("bestWpm") ? parseInt(localStorage.getItem("bestWpm") || "0") : 0
};

export function getRandomWords(count: number, difficulty: string): string {
  const words = WORD_SETS[difficulty] || WORD_SETS.medium;
  let result = "";
  for (let i = 0; i < count; i++) {
    result += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return result.trim();
}

export function calculateStats(): TypingStats {
  const target = STATE.textToType;
  const input = STATE.userInput;
  let correctChars = 0;
  let errors = 0;

  for (let i = 0; i < target.length; i++) {
    if (i < input.length) {
      if (input[i] === target[i]) {
        correctChars++;
      } else {
        errors++;
      }
    }
  }

  const totalChars = Math.max(target.length, input.length);
  const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 100;
  const timeInMinutes = (STATE.totalTime - STATE.timeRemaining) / 60;
  const wpm = timeInMinutes > 0 ? Math.round((correctChars / 5) / timeInMinutes) : 0;

  return {
    wpm,
    accuracy: Math.round(accuracy),
    errors,
    correctChars,
    totalChars,
    timeElapsed: STATE.totalTime - STATE.timeRemaining
  };
}

export function updateAchievements(stats: TypingStats): Achievement[] {
  const achievements: Achievement[] = [
    { name: "Comenzador", icon: "🚀", unlocked: stats.wpm >= 20 },
    { name: "Mecanógrafo", icon: "⌨️", unlocked: stats.wpm >= 50 },
    { name: "Rayo", icon: "⚡", unlocked: stats.wpm >= 100 },
    { name: "Perfeccionista", icon: "✨", unlocked: stats.accuracy === 100 },
    { name: "Finalizador", icon: "🏁", unlocked: stats.totalChars >= STATE.textToType.length }
  ];

  STATE.achievements = achievements;
  return achievements;
}
