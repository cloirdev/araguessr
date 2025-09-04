import { useState, useEffect } from "react";
import Mapa from "./components/MapaAragon";
import Menu from "./components/Menu";
import comarcasData from "./data/comarcas.json";
import riosData from "./data/rios.json";
import "./App.css";

const GAME_STATES = {
  MENU: "menu",
  PLAYING: "playing",
  FINISHED: "finished",
};

export default function App() {
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [user, setUser] = useState(null);
  const [comarcas] = useState([...comarcasData.comarcas]);
  const [rios] = useState([...riosData.rios]);
  const [elementosRestantes, setElementosRestantes] = useState([]);
  const [elementoActual, setElementoActual] = useState(null);
  const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
  const [modo, setModo] = useState(null);
  const [resultados, setResultados] = useState({});
  const [puntuacion, setPuntuacion] = useState({ aciertos: 0, intentos: 0 });
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [timerIniciado, setTimerIniciado] = useState(false);

  useEffect(() => {
    let id;
    if (timerIniciado) {
      id = setInterval(() => {
        setTiempoTranscurrido((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    }
    return () => {
      if (id) clearInterval(id);
    };
  }, [timerIniciado]);

  const startGame = (username, gameMode) => {
    setUser({ name: username });
    setResultados({});
    setPuntuacion({ aciertos: 0, intentos: 0 });
    setTiempoTranscurrido(0);
    setElementoSeleccionado(null);
    setModo(gameMode);
    setTimerIniciado(false);

    let datosModo;
    if (gameMode === "comarcas") {
      datosModo = comarcas;
    } else if (gameMode === "rios") {
      datosModo = rios;
    }

    if (datosModo && datosModo.length > 0) {
      const elementosBarajados = [...datosModo].sort(() => Math.random() - 0.5);
      setElementosRestantes(elementosBarajados);
      setElementoActual(elementosBarajados[0]);
    }

    setGameState(GAME_STATES.PLAYING);
  };

  const handleElementoSeleccionado = (id) => {
    if (elementoSeleccionado || !elementoActual) return;
    if (!timerIniciado) {
      setTimerIniciado(true);
    }

    let elementosActuales;
    if (modo === "comarcas") {
      elementosActuales = comarcas;
    } else if (modo === "rios") {
      elementosActuales = rios;
    }

    const elementoClickado = elementosActuales.find((e) => e.id === id);
    if (!elementoClickado) return;

    const esCorrecto = elementoActual.id === elementoClickado.id;
    setElementoSeleccionado(elementoClickado);

    const nuevosResultados = {
      ...resultados,
      [elementoActual.id]: esCorrecto ? "acierto" : "fallo",
    };
    setResultados(nuevosResultados);

    setPuntuacion((prev) => ({
      aciertos: esCorrecto ? prev.aciertos + 1 : prev.aciertos,
      intentos: prev.intentos + 1,
    }));

    setTimeout(() => {
      let nuevosElementosRestantes;
      if (esCorrecto) {
        nuevosElementosRestantes = elementosRestantes.filter(
          (e) => e.id !== elementoActual.id
        );
      } else {
        nuevosElementosRestantes = elementosRestantes;
      }

      setElementosRestantes(nuevosElementosRestantes);
      setElementoSeleccionado(null);

      if (nuevosElementosRestantes.length > 0) {
        const indiceAleatorio = Math.floor(
          Math.random() * nuevosElementosRestantes.length
        );
        setElementoActual(nuevosElementosRestantes[indiceAleatorio]);
      } else {
        setGameState(GAME_STATES.FINISHED);
        clearInterval(intervalId);
      }
    }, 1000);
  };

  const reiniciarJuego = () => {
    if (intervalId) clearInterval(intervalId);
    setGameState(GAME_STATES.MENU);
  };

  const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, "0")}:${segundosRestantes
      .toString()
      .padStart(2, "0")}`;
  };

  const totalElementos = modo === "comarcas" ? comarcas.length : rios.length;
  const elementosCompletados = totalElementos - elementosRestantes.length;
  const porcentajeCompletado =
    totalElementos > 0
      ? Math.round((elementosCompletados / totalElementos) * 100)
      : 0;

  if (gameState === GAME_STATES.MENU) {
    return <Menu onStartGame={startGame} />;
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
          <p>
            Puntuación: {puntuacion.aciertos} de {puntuacion.intentos}
          </p>
          <p>
            Porcentaje de aciertos:{" "}
            {puntuacion.intentos > 0
              ? Math.round((puntuacion.aciertos / puntuacion.intentos) * 100)
              : 0}
            %
          </p>
        </div>
        <button onClick={reiniciarJuego} className="btn-primary">
          Volver al menú principal
        </button>
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
          <span>
            Puntuación: {puntuacion.aciertos}/{puntuacion.intentos}
          </span>
        </div>
      </div>
      <header>
        <h1>¿Dónde está {elementoActual?.nombre}?</h1>
        <div className="puntuacion">
          Completados: {elementosCompletados} de {totalElementos}
        </div>
        <div className="barra-progreso">
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
          </div>
          <div className="mapa-container">
            <Mapa
              modo={modo}
              comarcas={comarcas}
              rios={rios}
              resultados={resultados}
              onClickElemento={handleElementoSeleccionado}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
