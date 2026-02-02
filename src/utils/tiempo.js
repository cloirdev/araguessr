/**
 * Formatea segundos a formato MM:SS
 * @param {number} segundos - Tiempo en segundos
 * @returns {string} Tiempo formateado (ej: "05:23")
 */
export const formatearTiempo = (segundos) => {
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;
  return `${minutos.toString().padStart(2, "0")}:${segundosRestantes
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Calcula el bonus por tiempo rápido
 * @param {number} tiempoRespuesta - Tiempo de respuesta en segundos
 * @param {number} threshold - Umbral para bonus
 * @param {number} multiplier - Multiplicador del bonus
 * @returns {number} Bonus calculado
 */
export const calcularBonusTiempo = (tiempoRespuesta, threshold, multiplier) => {
  if (tiempoRespuesta <= threshold) {
    return multiplier;
  }
  return 1;
};
