let audioContext = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

/**
 * Reproduce un sonido simple usando Web Audio API
 * @param {string} type - Tipo de sonido: 'success', 'error', 'complete'
 * @param {boolean} enabled - Si el sonido está habilitado
 */
export const playSound = (type, enabled = true) => {
  if (!enabled) return;

  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    switch (type) {
      case "success":
        // Sonido de acierto: tono ascendente
        oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(
          784,
          ctx.currentTime + 0.1
        ); // G5
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          ctx.currentTime + 0.2
        );
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.2);
        break;

      case "error":
        // Sonido de error: tono descendente
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          200,
          ctx.currentTime + 0.15
        );
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          ctx.currentTime + 0.15
        );
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
        break;

      case "complete": {
        // Sonido de victoria: secuencia ascendente
        const frequencies = [523, 659, 784, 1047]; // C5, E5, G5, C6
        frequencies.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(
            0.01,
            ctx.currentTime + i * 0.1 + 0.3
          );
          osc.start(ctx.currentTime + i * 0.1);
          osc.stop(ctx.currentTime + i * 0.1 + 0.3);
        });
        break;
      }

      case "streak":
        // Sonido de racha: tono rápido
        oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          ctx.currentTime + 0.1
        );
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
        break;

      default:
        break;
    }
  } catch (error) {
    console.error("Error al reproducir sonido:", error);
  }
};
