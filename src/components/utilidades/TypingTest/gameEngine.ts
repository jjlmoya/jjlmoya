export interface GameState {
  wave: number;
  score: number;
  health: number;
  maxHealth: number;
  enemyHealth: number;
  maxEnemyHealth: number;
  streak: number;
  totalWords: number;
  correctWords: number;
  gameOver: boolean;
}

export interface WordPool {
  easy: string[];
  medium: string[];
  hard: string[];
}

export const WORDS: WordPool = {
  easy: [
    "casa", "perro", "gato", "sol", "luna", "amor", "risa", "juego", "tiempo", "vida",
    "muerte", "noche", "día", "amigo", "familia", "comer", "beber", "dormir", "soñar", "correr",
    "bailar", "cantar", "saltar", "volar", "nadar", "caminar", "libro", "palabra", "letra", "número",
    "color", "árbol", "flor", "agua", "fuego", "aire", "tierra", "mar", "montaña", "río",
    "cielo", "estrella", "nubes", "viento", "lluvia", "nieve", "hielo", "calor", "frío", "luz",
    "sombra", "ventana", "puerta", "mesa", "silla", "cama", "ropa", "zapato", "sombrero", "bolsa",
    "dinero", "regalo", "fiesta", "música", "película", "foto", "cuadro", "espejo", "reloj", "teléfono"
  ],
  medium: [
    "montaña", "aventura", "misterio", "espacio", "universo", "planeta", "estrella", "cometa", "constelación", "galaxia",
    "teléfono", "computadora", "pantalla", "sistema", "conexión", "internet", "navegador", "música", "instrumento", "melodía",
    "armonía", "ritmo", "danza", "teatro", "película", "actor", "director", "escena", "personaje", "historia",
    "biblioteca", "novela", "poema", "autor", "escritor", "página", "capítulo", "argumento", "trama", "final",
    "universidad", "estudiante", "profesor", "clase", "lección", "examen", "prueba", "diploma", "carrera", "conocimiento",
    "arte", "pintura", "escultura", "galería", "museo", "antigüedad", "civilización", "imperio", "reinado", "conquista",
    "batalla", "guerra", "paz", "tratado", "alianza", "enemigo", "victoria", "derrota", "heroísmo", "valor"
  ],
  hard: [
    "extraordinario", "magnífico", "espectacular", "increíble", "sorprendente", "fantasía", "imaginación", "inspiración", "revolución", "transformación",
    "metamorfosis", "evolución", "progreso", "excelencia", "perfección", "humanidad", "sociedad", "civilización", "cultura", "tradición",
    "patrimonio", "arqueología", "paleontología", "antropología", "cosmología", "epistemología", "filosofía", "sabiduría", "virtud", "verdad",
    "justicia", "libertad", "igualdad", "democracia", "república", "monarquía", "tiranía", "anarquía", "feudalismo", "capitalismo",
    "socialismo", "comunismo", "dictadura", "régimen", "gobierno", "política", "diplomacia", "negociación", "acuerdo", "tratado",
    "constitución", "derecho", "ley", "justicia", "tribunal", "sentencia", "recurso", "apelación", "abogado", "abogada"
  ]
};

export function createGameState(): GameState {
  return {
    wave: 1,
    score: 0,
    health: 100,
    maxHealth: 100,
    enemyHealth: 50,
    maxEnemyHealth: 50,
    streak: 0,
    totalWords: 0,
    correctWords: 0,
    gameOver: false
  };
}

export function getDifficulty(wave: number): keyof WordPool {
  if (wave < 5) return "easy";
  if (wave < 10) return "medium";
  return "hard";
}

export function getRandomWord(wordPool: WordPool, difficulty: keyof WordPool): string {
  const words = wordPool[difficulty];
  return words[Math.floor(Math.random() * words.length)];
}

export function calculateDamage(streak: number, difficulty: keyof WordPool): number {
  const baseDamage = difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 15;
  return baseDamage + Math.floor(streak / 3);
}

export function getNextWaveHealth(wave: number): number {
  return 50 + (wave - 1) * 10;
}

export function checkWordCorrect(input: string, target: string): boolean {
  return input.trim().toLowerCase() === target.trim().toLowerCase();
}

export function getAccuracy(state: GameState): number {
  if (state.totalWords === 0) return 100;
  return Math.round((state.correctWords / state.totalWords) * 100);
}

export function saveHighScore(score: number): void {
  const scores = JSON.parse(localStorage.getItem("typingRoguelikeScores") || "[]") as number[];
  scores.push(score);
  scores.sort((a, b) => b - a);
  localStorage.setItem("typingRoguelikeScores", JSON.stringify(scores.slice(0, 10)));
}

export function getHighScores(): number[] {
  return JSON.parse(localStorage.getItem("typingRoguelikeScores") || "[]") as number[];
}
