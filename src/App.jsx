import { useState, useEffect } from "react";
import MapaAragon from "./components/MapaAragon";
import Menu from "./components/Menu";
import comarcasData from "./data/comarcas.json";
import "./App.css";

// Game states
const GAME_STATES = {
  MENU: "menu",
  PLAYING: "playing",
  FINISHED: "finished",
};

export default function App() {
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [user, setUser] = useState(null);
  const [comarcas] = useState([...comarcasData.comarcas]);
  const [comarcasRestantes, setComarcasRestantes] = useState([]);
  const [comarcaActual, setComarcaActual] = useState(null);
  const [comarcaSeleccionada, setComarcaSeleccionada] = useState(null);
  const [resultados, setResultados] = useState({});
  const [puntuacion, setPuntuacion] = useState({ aciertos: 0, intentos: 0 });
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [timerIniciado, setTimerIniciado] = useState(false);
  const [mostrarBandera, setMostrarBandera] = useState(false);
  const [banderaActual, setBanderaActual] = useState("");

  const startGame = (username) => {
    setUser({ name: username });
    setResultados({});
    setPuntuacion({ aciertos: 0, intentos: 0 });
    setJuegoTerminado(false);
    setTiempoTranscurrido(0);
    setComarcaSeleccionada(null);

    // Barajar las comarcas y comenzar el juego
    const comarcasBarajadas = [...comarcas].sort(() => Math.random() - 0.5);
    setComarcasRestantes(comarcasBarajadas);
    setComarcaActual(comarcasBarajadas[0]);
    setGameState(GAME_STATES.PLAYING);
  };

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

  const handleComarcaSeleccionada = (id) => {
    if (comarcaSeleccionada || juegoTerminado || !comarcaActual) return;

    // Iniciar el temporizador en el primer intento
    if (!timerIniciado) {
      setTimerIniciado(true);
    }

    // Ocultar bandera si se muestra una anterior
    setMostrarBandera(false);

    const comarcaClickada = comarcas.find((c) => c.id === id);
    if (!comarcaClickada) return;

    const esCorrecto = comarcaActual.id === comarcaClickada.id;
    setComarcaSeleccionada(comarcaClickada);

    // Mostrar bandera si la respuesta es correcta
    if (esCorrecto && comarcaActual.bandera) {
      setBanderaActual(comarcaActual.bandera);
      setMostrarBandera(true);
    }

    const nuevosResultados = {
      ...resultados,
      [comarcaActual.id]: esCorrecto ? "acierto" : "fallo",
    };
    setResultados(nuevosResultados);

    setPuntuacion((prev) => ({
      aciertos: esCorrecto ? prev.aciertos + 1 : prev.aciertos,
      intentos: prev.intentos + 1,
    }));

    setTimeout(() => {
      let nuevasComarcasRestantes;
      if (esCorrecto) {
        nuevasComarcasRestantes = comarcasRestantes.filter(
          (c) => c.id !== comarcaActual.id
        );
      } else {
        nuevasComarcasRestantes = comarcasRestantes;
      }

      setComarcasRestantes(nuevasComarcasRestantes);
      setComarcaSeleccionada(null);

      if (nuevasComarcasRestantes.length > 0) {
        const indiceAleatorio = Math.floor(
          Math.random() * nuevasComarcasRestantes.length
        );
        setComarcaActual(nuevasComarcasRestantes[indiceAleatorio]);
      } else {
        setJuegoTerminado(true);
        setGameState(GAME_STATES.FINISHED);
      }
    }, 1000);
  };

  const reiniciarJuego = () => {
    if (intervalId) clearInterval(intervalId);
    setPuntuacion({ aciertos: 0, intentos: 0 });
    setResultados({});
    setJuegoTerminado(false);
    setTiempoTranscurrido(0);
    setComarcaSeleccionada(null);
    setComarcasRestantes([]);
    setComarcaActual(null);
    setGameState(GAME_STATES.MENU);
  };

  const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, "0")}:${segundosRestantes
      .toString()
      .padStart(2, "0")}`;
  };

  const totalComarcas = comarcas.length;
  const comarcasCompletadas = totalComarcas - comarcasRestantes.length;
  const porcentajeCompletado =
    comarcas.length > 0
      ? Math.round((comarcasCompletadas / totalComarcas) * 100)
      : 0;

  if (gameState === GAME_STATES.MENU) {
    return <Menu onStartGame={startGame} />;
  }

  if (gameState === GAME_STATES.PLAYING && !comarcaActual) {
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
        <h1>¿Dónde está {comarcaActual?.nombre}?</h1>
        <div className="puntuacion">
          Completadas: {comarcasCompletadas} de {totalComarcas} | Aciertos:{" "}
          {puntuacion.aciertos}
        </div>
        <div className="barra-progreso">
          <div
            className="progreso"
            style={{ width: `${porcentajeCompletado}%` }}
          ></div>
        </div>
      </header>

      <main>
        {!juegoTerminado ? (
          <div className="game-layout">
            <div className="panel-quiz">
              <h3>Haz clic en la comarca:</h3>
              <h2>{comarcaActual?.nombre}</h2>
              {mostrarBandera && banderaActual && (
                <div className="bandera-container">
                  <img
                    src={banderaActual}
                    alt={`Bandera de ${comarcaActual?.nombre}`}
                    className="bandera"
                  />
                </div>
              )}
            </div>
            <div className="mapa-container">
              <MapaAragon 
        comarcas={comarcas} 
        resultados={resultados} 
        onClickElemento={handleComarcaSeleccionada} 
      />
            </div>
          </div>
        ) : (
          <div className="juego-terminado">
            <h2>¡Felicidades! 🎉</h2>
            <p>¡Has completado todas las comarcas de Aragón!</p>
            <p>Puntuación final: </p>
            <div className="puntuacion-final">
              {puntuacion.aciertos} de {puntuacion.intentos} aciertos
              <br />(
              {puntuacion.intentos > 0
                ? Math.round((puntuacion.aciertos / puntuacion.intentos) * 100)
                : 0}
              % de aciertos)
            </div>
            <button onClick={reiniciarJuego} className="boton-reiniciar">
              Jugar de nuevo
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
