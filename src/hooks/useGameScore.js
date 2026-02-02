import { useState, useCallback, useRef } from "react";
import { SCORING } from "../constants/gameConstants";
import { calcularBonusTiempo } from "../utils/tiempo";

/**
 * Hook personalizado para gestionar la puntuación del juego
 * @returns {object} - Estado de puntuación y funciones para actualizar
 */
export const useGameScore = () => {
  const [puntuacion, setPuntuacion] = useState({
    aciertos: 0,
    intentos: 0,
    puntos: 0,
    racha: 0,
    maxRacha: 0,
  });
  
  const [fallos, setFallos] = useState([]);
  const tiempoUltimaRespuestaRef = useRef(Date.now());

  const registrarAcierto = useCallback(() => {
    const tiempoRespuesta = (Date.now() - tiempoUltimaRespuestaRef.current) / 1000;
    const bonusTiempo = calcularBonusTiempo(
      tiempoRespuesta,
      SCORING.TIME_BONUS_THRESHOLD,
      SCORING.TIME_BONUS_MULTIPLIER
    );

    setPuntuacion((prev) => {
      const nuevaRacha = prev.racha + 1;
      const multiplicadorRacha = 1 + nuevaRacha * SCORING.STREAK_MULTIPLIER;
      const puntosGanados = Math.round(
        SCORING.BASE_POINTS * bonusTiempo * multiplicadorRacha
      );

      return {
        aciertos: prev.aciertos + 1,
        intentos: prev.intentos + 1,
        puntos: prev.puntos + puntosGanados,
        racha: nuevaRacha,
        maxRacha: Math.max(prev.maxRacha, nuevaRacha),
      };
    });

    tiempoUltimaRespuestaRef.current = Date.now();
  }, []);

  const registrarFallo = useCallback((elementoId) => {
    setPuntuacion((prev) => ({
      ...prev,
      intentos: prev.intentos + 1,
      puntos: Math.max(0, prev.puntos + SCORING.FAIL_PENALTY),
      racha: 0,
    }));

    setFallos((prev) => [...prev, elementoId]);
    tiempoUltimaRespuestaRef.current = Date.now();
  }, []);

  const usarHint = useCallback(() => {
    setPuntuacion((prev) => ({
      ...prev,
      puntos: Math.max(0, prev.puntos + SCORING.HINT_PENALTY),
    }));
  }, []);

  const resetScore = useCallback(() => {
    setPuntuacion({
      aciertos: 0,
      intentos: 0,
      puntos: 0,
      racha: 0,
      maxRacha: 0,
    });
    setFallos([]);
    tiempoUltimaRespuestaRef.current = Date.now();
  }, []);

  const iniciarRespuesta = useCallback(() => {
    tiempoUltimaRespuestaRef.current = Date.now();
  }, []);

  return {
    puntuacion,
    fallos,
    registrarAcierto,
    registrarFallo,
    usarHint,
    resetScore,
    iniciarRespuesta,
  };
};
