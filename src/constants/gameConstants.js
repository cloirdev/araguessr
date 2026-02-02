export const GAME_STATES = {
  MENU: "menu",
  PLAYING: "playing",
  PAUSED: "paused",
  FINISHED: "finished",
  STUDY: "study",
  ACHIEVEMENTS: "achievements",
  STATS: "stats",
};

export const GAME_MODES = {
  COMARCAS: "comarcas",
  RIOS: "rios",
  MUNICIPIOS: "municipios",
  CONTRA_RELOJ: "contraReloj",
  MULTIPLAYER: "multiplayer",
};

export const DIFFICULTY_LEVELS = {
  FACIL: "facil",
  MEDIA: "media",
  DIFICIL: "dificil",
};

export const LIVES_MODE = {
  UNLIMITED: "unlimited",
  THREE_LIVES: "threeLives",
};

export const SCORING = {
  BASE_POINTS: 100,
  TIME_BONUS_THRESHOLD: 3, // segundos
  TIME_BONUS_MULTIPLIER: 1.5,
  STREAK_MULTIPLIER: 0.1, // +10% por cada acierto consecutivo
  FAIL_PENALTY: -10,
  HINT_PENALTY: -30,
};

export const TIMER = {
  CONTRA_RELOJ_DURATION: 300, // 5 minutos en segundos
};
