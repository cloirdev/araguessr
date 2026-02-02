import { GAME_MODES, DIFFICULTY_LEVELS } from "../constants/gameConstants";

/**
 * Obtiene los elementos filtrados según modo y dificultad
 * @param {string} modo - Modo de juego (comarcas, rios, municipios)
 * @param {string} dificultad - Nivel de dificultad
 * @param {Array} comarcas - Array de comarcas
 * @param {Array} rios - Array de ríos
 * @param {Array} municipios - Array de municipios
 * @returns {Array} Array de elementos filtrados
 */
export const getElementosByModoYDificultad = (
  modo,
  dificultad,
  comarcas,
  rios,
  municipios
) => {
  if (modo === GAME_MODES.COMARCAS) {
    return comarcas;
  }

  if (modo === GAME_MODES.RIOS) {
    if (dificultad === DIFFICULTY_LEVELS.FACIL) {
      return rios.filter((r) => r.dificultad === "facil");
    } else if (dificultad === DIFFICULTY_LEVELS.MEDIA) {
      return rios.filter(
        (r) => r.dificultad === "facil" || r.dificultad === "media"
      );
    } else {
      return rios;
    }
  }

  if (modo === GAME_MODES.MUNICIPIOS) {
    return dificultad === DIFFICULTY_LEVELS.FACIL
      ? municipios.filter((m) => m.principal)
      : municipios;
  }

  return [];
};

/**
 * Baraja aleatoriamente un array
 * @param {Array} array - Array a barajar
 * @returns {Array} Array barajado
 */
export const barajarArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};
