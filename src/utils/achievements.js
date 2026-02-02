import { getFromStorage, saveToStorage, STORAGE_KEYS } from "./storage";

export const ACHIEVEMENTS = {
  FIRST_WIN: {
    id: "first_win",
    name: "Primer Triunfo",
    description: "Completa tu primera partida",
    icon: "🎯",
  },
  PERFECT_GAME: {
    id: "perfect_game",
    name: "Perfeccionista",
    description: "Completa una partida sin fallos",
    icon: "💎",
  },
  COMARCA_MASTER: {
    id: "comarca_master",
    name: "Maestro de Comarcas",
    description: "Completa el modo comarcas con 100% de aciertos",
    icon: "🗺️",
  },
  SPEED_RUNNER: {
    id: "speed_runner",
    name: "Velocista",
    description: "Completa una partida en menos de 3 minutos",
    icon: "⚡",
  },
  STREAK_MASTER: {
    id: "streak_master",
    name: "Racha Imparable",
    description: "Consigue una racha de 10 aciertos consecutivos",
    icon: "🔥",
  },
  EXPLORER: {
    id: "explorer",
    name: "Explorador",
    description: "Prueba todos los modos de juego",
    icon: "🧭",
  },
  DEDICATION: {
    id: "dedication",
    name: "Dedicación",
    description: "Juega 10 partidas",
    icon: "🎮",
  },
  RIVER_EXPERT: {
    id: "river_expert",
    name: "Experto en Ríos",
    description: "Completa el modo ríos en dificultad difícil",
    icon: "🌊",
  },
  MUNICIPALITY_PRO: {
    id: "municipality_pro",
    name: "Pro de Municipios",
    description: "Completa el modo municipios en dificultad difícil",
    icon: "🏘️",
  },
  LEGEND: {
    id: "legend",
    name: "Leyenda de Aragón",
    description: "Desbloquea todos los logros",
    icon: "👑",
  },
};

/**
 * Obtiene todos los logros del jugador
 * @returns {object} Logros desbloqueados
 */
export const getAchievements = () => {
  return getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, {});
};

/**
 * Desbloquea un logro
 * @param {string} achievementId - ID del logro a desbloquear
 * @returns {boolean} true si se desbloqueó, false si ya estaba desbloqueado
 */
export const unlockAchievement = (achievementId) => {
  const achievements = getAchievements();
  
  if (achievements[achievementId]) {
    return false; // Ya estaba desbloqueado
  }

  achievements[achievementId] = {
    unlockedAt: new Date().toISOString(),
  };

  saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, achievements);
  return true;
};

/**
 * Verifica si se deben desbloquear logros basado en los datos de la partida
 * @param {object} gameData - Datos de la partida
 * @returns {Array} Array de logros desbloqueados en esta verificación
 */
export const checkAchievements = (gameData) => {
  const newAchievements = [];
  const stats = getFromStorage(STORAGE_KEYS.STATS, {});
  const {
    modo,
    dificultad,
    aciertos,
    intentos,
    tiempo,
    maxRacha,
  } = gameData;

  // Primer triunfo
  if (stats.totalPartidas === 1) {
    if (unlockAchievement(ACHIEVEMENTS.FIRST_WIN.id)) {
      newAchievements.push(ACHIEVEMENTS.FIRST_WIN);
    }
  }

  // Juego perfecto
  if (aciertos === intentos && intentos > 0) {
    if (unlockAchievement(ACHIEVEMENTS.PERFECT_GAME.id)) {
      newAchievements.push(ACHIEVEMENTS.PERFECT_GAME);
    }
  }

  // Maestro de comarcas
  if (modo === "comarcas" && aciertos === intentos && intentos > 0) {
    if (unlockAchievement(ACHIEVEMENTS.COMARCA_MASTER.id)) {
      newAchievements.push(ACHIEVEMENTS.COMARCA_MASTER);
    }
  }

  // Velocista (menos de 3 minutos = 180 segundos)
  if (tiempo < 180 && aciertos === intentos) {
    if (unlockAchievement(ACHIEVEMENTS.SPEED_RUNNER.id)) {
      newAchievements.push(ACHIEVEMENTS.SPEED_RUNNER);
    }
  }

  // Racha imparable
  if (maxRacha >= 10) {
    if (unlockAchievement(ACHIEVEMENTS.STREAK_MASTER.id)) {
      newAchievements.push(ACHIEVEMENTS.STREAK_MASTER);
    }
  }

  // Experto en ríos
  if (modo === "rios" && dificultad === "dificil" && aciertos === intentos) {
    if (unlockAchievement(ACHIEVEMENTS.RIVER_EXPERT.id)) {
      newAchievements.push(ACHIEVEMENTS.RIVER_EXPERT);
    }
  }

  // Pro de municipios
  if (modo === "municipios" && dificultad === "dificil" && aciertos === intentos) {
    if (unlockAchievement(ACHIEVEMENTS.MUNICIPALITY_PRO.id)) {
      newAchievements.push(ACHIEVEMENTS.MUNICIPALITY_PRO);
    }
  }

  // Dedicación
  if (stats.totalPartidas >= 10) {
    if (unlockAchievement(ACHIEVEMENTS.DEDICATION.id)) {
      newAchievements.push(ACHIEVEMENTS.DEDICATION);
    }
  }

  // Leyenda (todos los logros excepto este)
  const unlockedAchievements = getAchievements();
  const totalAchievements = Object.keys(ACHIEVEMENTS).length - 1; // -1 por LEGEND
  if (Object.keys(unlockedAchievements).length >= totalAchievements) {
    if (unlockAchievement(ACHIEVEMENTS.LEGEND.id)) {
      newAchievements.push(ACHIEVEMENTS.LEGEND);
    }
  }

  return newAchievements;
};

/**
 * Calcula el progreso de logros
 * @returns {object} Porcentaje de progreso
 */
export const getAchievementProgress = () => {
  const unlockedAchievements = getAchievements();
  const total = Object.keys(ACHIEVEMENTS).length;
  const unlocked = Object.keys(unlockedAchievements).length;

  return {
    unlocked,
    total,
    percentage: Math.round((unlocked / total) * 100),
  };
};
