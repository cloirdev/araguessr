import { useState, useEffect, useRef } from "react";

/**
 * Hook personalizado para gestionar el timer del juego
 * @param {boolean} isRunning - Indica si el timer debe estar corriendo
 * @returns {object} - Tiempo transcurrido y función para resetear
 */
export const useGameTimer = (isRunning = false) => {
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTiempoTranscurrido((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const resetTimer = () => {
    setTiempoTranscurrido(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return { tiempoTranscurrido, resetTimer };
};
