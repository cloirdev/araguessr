const STORAGE_KEYS = {
  RECORDS: "aragon_game_records",
  STATS: "aragon_game_stats",
  ACHIEVEMENTS: "aragon_game_achievements",
  SETTINGS: "aragon_game_settings",
  DAILY_CHALLENGE: "aragon_daily_challenge",
};

/**
 * Guarda datos en localStorage
 * @param {string} key - Clave de almacenamiento
 * @param {any} data - Datos a guardar
 */
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
  }
};

/**
 * Obtiene datos de localStorage
 * @param {string} key - Clave de almacenamiento
 * @param {any} defaultValue - Valor por defecto si no existe
 * @returns {any} Datos recuperados o valor por defecto
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error al leer de localStorage:", error);
    return defaultValue;
  }
};

/**
 * Guarda un récord de juego
 * @param {string} modo - Modo de juego
 * @param {string} dificultad - Dificultad
 * @param {object} record - Datos del récord (puntuacion, tiempo, aciertos, etc.)
 */
export const saveRecord = (modo, dificultad, record) => {
  const records = getFromStorage(STORAGE_KEYS.RECORDS, {});
  const key = `${modo}_${dificultad || "normal"}`;

  if (!records[key] || record.puntuacion > records[key].puntuacion) {
    records[key] = {
      ...record,
      fecha: new Date().toISOString(),
    };
    saveToStorage(STORAGE_KEYS.RECORDS, records);
  }
};

/**
 * Obtiene el récord para un modo y dificultad
 * @param {string} modo - Modo de juego
 * @param {string} dificultad - Dificultad
 * @returns {object|null} Récord o null si no existe
 */
export const getRecord = (modo, dificultad) => {
  const records = getFromStorage(STORAGE_KEYS.RECORDS, {});
  const key = `${modo}_${dificultad || "normal"}`;
  return records[key] || null;
};

/**
 * Guarda estadísticas de la partida
 * @param {object} stats - Estadísticas a guardar
 */
export const saveStats = (stats) => {
  const allStats = getFromStorage(STORAGE_KEYS.STATS, {
    totalPartidas: 0,
    totalAciertos: 0,
    totalIntentos: 0,
    tiempoTotal: 0,
    elementosDificiles: {},
  });

  allStats.totalPartidas += 1;
  allStats.totalAciertos += stats.aciertos;
  allStats.totalIntentos += stats.intentos;
  allStats.tiempoTotal += stats.tiempo;

  // Tracking de elementos difíciles
  if (stats.fallos) {
    stats.fallos.forEach((elementoId) => {
      allStats.elementosDificiles[elementoId] =
        (allStats.elementosDificiles[elementoId] || 0) + 1;
    });
  }

  saveToStorage(STORAGE_KEYS.STATS, allStats);
};

/**
 * Obtiene todas las estadísticas
 * @returns {object} Estadísticas globales
 */
export const getStats = () => {
  return getFromStorage(STORAGE_KEYS.STATS, {
    totalPartidas: 0,
    totalAciertos: 0,
    totalIntentos: 0,
    tiempoTotal: 0,
    elementosDificiles: {},
  });
};

/**
 * Guarda configuración del usuario
 * @param {object} settings - Configuración
 */
export const saveSettings = (settings) => {
  saveToStorage(STORAGE_KEYS.SETTINGS, settings);
};

/**
 * Obtiene configuración del usuario
 * @returns {object} Configuración
 */
export const getSettings = () => {
  return getFromStorage(STORAGE_KEYS.SETTINGS, {
    soundEnabled: true,
    livesMode: "unlimited",
  });
};

export { STORAGE_KEYS };
