import { useState, useEffect } from "react";
import Mapa from "./components/MapaAragon";
import Menu from "./components/Menu";
import Stats from "./components/Stats";
import comarcasData from "./data/comarcas.json";
import riosData from "./data/rios.json";
import municipiosData from "./data/municipios.json";
import { GAME_STATES } from "./constants/gameConstants";
import { formatearTiempo } from "./utils/tiempo";
import { getElementosByModoYDificultad, barajarArray } from "./utils/elementos";
import { useGameTimer } from "./hooks/useGameTimer";
import { useGameScore } from "./hooks/useGameScore";
import { saveRecord, saveStats, getSettings } from "./utils/storage";
import { playSound } from "./utils/sounds";
import { checkAchievements } from "./utils/achievements";
import "./App.css";

export default function App() {
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [user, setUser] = useState(null);
  const [comarcas] = useState([...comarcasData.comarcas]);
  const [rios] = useState([...riosData.rios]);
  const [municipios] = useState([...municipiosData.municipios]);
  const [elementosRestantes, setElementosRestantes] = useState([]);
  const [elementoActual, setElementoActual] = useState(null);
  const [modo, setModo] = useState(null);
  const [dificultad, setDificultad] = useState(null);
  const [resultados, setResultados] = useState({});
  const [timerIniciado, setTimerIniciado] = useState(false);
  const [elementoClickeado, setElementoClickeado] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [settings] = useState(getSettings());
  const [newAchievements, setNewAchievements] = useState([]);

  // Custom hooks
  const { tiempoTranscurrido, resetTimer } = useGameTimer(timerIniciado);
  const {
    puntuacion,
    fallos,
    registrarAcierto,
    registrarFallo,
    resetScore,
    iniciarRespuesta,
  } = useGameScore();

  // Detectar racha para reproducir sonido especial
  useEffect(() => {
    if (puntuacion.racha > 0 && puntuacion.racha % 3 === 0) {
      playSound("streak", settings.soundEnabled);
    }
  }, [puntuacion.racha, settings.soundEnabled]);

  const startGame = (username, gameMode, difficulty) => {
    setUser({ name: username });
    setResultados({});
    resetScore();
    resetTimer();
    setModo(gameMode);
    setDificultad(difficulty);
    setTimerIniciado(false);
    setElementoClickeado(null);

    const datosModo = getElementosByModoYDificultad(
      gameMode,
      difficulty,
      comarcas,
      rios,
      municipios
    );

    if (datosModo && datosModo.length > 0) {
      const elementosBarajados = barajarArray(datosModo);
      setElementosRestantes(elementosBarajados);
      setElementoActual(elementosBarajados[0]);
    }

    setGameState(GAME_STATES.PLAYING);
  };

  const handleElementoSeleccionado = (id) => {
    if (!elementoActual) return;
    
    if (!timerIniciado) {
      setTimerIniciado(true);
      iniciarRespuesta();
    }

    const elementosActuales = getElementosByModoYDificultad(
      modo,
      dificultad,
      comarcas,
      rios,
      municipios
    );

    const clickeado = elementosActuales.find((e) => e.id === id);
    if (!clickeado) return;

    const esCorrecto = elementoActual.id === clickeado.id;
    setElementoClickeado(clickeado);

    const nuevosResultados = {
      ...resultados,
      [elementoActual.id]: esCorrecto ? "acierto" : "fallo",
    };
    setResultados(nuevosResultados);

    if (esCorrecto) {
      registrarAcierto();
      playSound("success", settings.soundEnabled);
    } else {
      registrarFallo(elementoActual.id);
      playSound("error", settings.soundEnabled);
    }

    setTimeout(() => {
      setElementoClickeado(null);
      
      // NUEVA MECÁNICA: Siempre eliminar el elemento actual, aciertes o falles
      const nuevosElementosRestantes = elementosRestantes.filter(
        (e) => e.id !== elementoActual.id
      );

      setElementosRestantes(nuevosElementosRestantes);
      setElementoActual(
        nuevosElementosRestantes.length > 0
          ? nuevosElementosRestantes[
              Math.floor(Math.random() * nuevosElementosRestantes.length)
            ]
          : null
      );

      if (nuevosElementosRestantes.length === 0) {
        // Guardar récord y estadísticas
        saveRecord(modo, dificultad, {
          puntuacion: puntuacion.puntos,
          tiempo: tiempoTranscurrido,
          aciertos: puntuacion.aciertos + (esCorrecto ? 1 : 0),
          intentos: puntuacion.intentos + 1,
        });
        saveStats({
          aciertos: puntuacion.aciertos + (esCorrecto ? 1 : 0),
          intentos: puntuacion.intentos + 1,
          tiempo: tiempoTranscurrido,
          fallos,
        });
        
        // Verificar logros
        const unlockedAchievements = checkAchievements({
          modo,
          dificultad,
          aciertos: puntuacion.aciertos + (esCorrecto ? 1 : 0),
          intentos: puntuacion.intentos + 1,
          tiempo: tiempoTranscurrido,
          maxRacha: puntuacion.maxRacha,
        });
        
        if (unlockedAchievements.length > 0) {
          setNewAchievements(unlockedAchievements);
        }
        
        playSound("complete", settings.soundEnabled);
        setGameState(GAME_STATES.FINISHED);
        setTimerIniciado(false);
      }
    }, 1000);
  };

  const reiniciarJuego = () => {
    setGameState(GAME_STATES.MENU);
    resetTimer();
    resetScore();
    setNewAchievements([]);
  };

  // Lista de elementos visibles para el mapa
  const elementosVisibles = getElementosByModoYDificultad(
    modo,
    dificultad,
    comarcas,
    rios,
    municipios
  );

  const totalElementos = elementosVisibles.length;
  const elementosCompletados = totalElementos - elementosRestantes.length;
  const porcentajeCompletado =
    totalElementos > 0
      ? Math.round((elementosCompletados / totalElementos) * 100)
      : 0;

  if (gameState === GAME_STATES.MENU) {
    return (
      <>
        <Menu 
          onStartGame={startGame} 
          onShowStats={() => setShowStats(true)} 
        />
        {showStats && <Stats onClose={() => setShowStats(false)} />}
      </>
    );
  }

  if (gameState === GAME_STATES.PLAYING && !elementoActual) {
    return <div className="loading">Cargando juego...</div>;
  }

  if (gameState === GAME_STATES.FINISHED) {
    return (
      <div className="game-finished">
        <h2>¡Juego Terminado, {user?.name}!</h2>
        <div className="score">
          <p>Tiempo total: {formatearTiempo(tiempoTranscurrido)}</p>
          <p>Puntos totales: {puntuacion.puntos}</p>
          <p>
            Aciertos: {puntuacion.aciertos} de {puntuacion.intentos}
          </p>
          <p>
            Porcentaje de aciertos:{" "}
            {puntuacion.intentos > 0
              ? Math.round((puntuacion.aciertos / puntuacion.intentos) * 100)
              : 0}
            %
          </p>
          {puntuacion.maxRacha > 0 && (
            <p>Mejor racha: {puntuacion.maxRacha} 🔥</p>
          )}
        </div>
        
        {newAchievements.length > 0 && (
          <div className="achievements-notification">
            <h3>🏆 ¡Logros Desbloqueados!</h3>
            {newAchievements.map(achievement => (
              <div key={achievement.id} className="achievement-item">
                <span className="achievement-icon">{achievement.icon}</span>
                <div>
                  <strong>{achievement.name}</strong>
                  <p>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="finish-buttons">
          <button onClick={reiniciarJuego} className="btn-primary">
            Volver al menú principal
          </button>
          <button onClick={() => setShowStats(true)} className="btn-secondary">
            Ver estadísticas
          </button>
        </div>
        {showStats && <Stats onClose={() => setShowStats(false)} />}
      </div>
    );
  }

  return (
    <div className="app">
      <div className="user-info">
        <span>Jugador: {user?.name}</span>
        <div className="game-stats">
          <span className="timer">
            ⏱️ {formatearTiempo(tiempoTranscurrido)}
          </span>
          <span>Completado: {porcentajeCompletado}%</span>
          <span>Puntos: {puntuacion.puntos}</span>
          {puntuacion.racha > 0 && (
            <span className="streak">🔥 Racha: {puntuacion.racha}</span>
          )}
        </div>
      </div>
      <header>
        <h1 aria-live="polite">¿Dónde está {elementoActual?.nombre}?</h1>
        <div className="puntuacion" aria-live="polite" aria-atomic="true">
          Completados: {elementosCompletados} de {totalElementos}
        </div>
        <div className="barra-progreso" role="progressbar" aria-valuenow={porcentajeCompletado} aria-valuemin="0" aria-valuemax="100" aria-label="Progreso del juego">
          <div
            className="progreso"
            style={{ width: `${porcentajeCompletado}%` }}
          ></div>
        </div>
      </header>

      <main>
        <div className="game-layout">
          <div className="panel-quiz">
            <h3>Haz clic en el mapa:</h3>
            <h2>{elementoActual?.nombre}</h2>
            {elementoClickeado && (
              <p className="clicked-feedback" aria-live="assertive">
                Clickeaste: {elementoClickeado.nombre}
              </p>
            )}
          </div>
          <div className="mapa-container">
            <Mapa
              modo={modo}
              elementosIds={elementosVisibles.map((e) => e.id)}
              resultados={resultados}
              onClickElemento={handleElementoSeleccionado}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
