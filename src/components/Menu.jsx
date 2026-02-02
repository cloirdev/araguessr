import { useState } from "react";
import "../Menu.css";

const Menu = ({ onStartGame, onShowStats }) => {
  const [username, setUsername] = useState("");
  const [showGameModes, setShowGameModes] = useState(false);
  const [gameMode, setGameMode] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setShowGameModes(true);
    }
  };

  const handleModeSelect = (mode) => {
    if (mode === "comarcas") {
      onStartGame(username.trim(), mode, null);
    } else {
      setGameMode(mode);
    }
  };

  const handleDifficultySelect = (diff) => {
    onStartGame(username.trim(), gameMode, diff);
  };

  if (!showGameModes) {
    return (
      <div className="menu-container">
        <div className="menu-header">
          <h1>Araguessr</h1>
          {onShowStats && (
            <button
              className="stats-button"
              onClick={onShowStats}
              aria-label="Ver estadísticas"
            >
              📊
            </button>
          )}
        </div>
        <p>Bienvenido al portal de la geografía aragonesa.</p>
        <p>
          Aquí te enfrentarás a los retos más desafíantes de toda la Corona de
          Aragón.
        </p>
        <p>¿Cómo te llamas?</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Introduce tu nombre"
            required
            aria-label="Nombre de usuario"
          />
          <button type="submit" aria-label="Continuar al menú de modos">Continuar</button>
        </form>
      </div>
    );
  }

  if (!gameMode) {
    return (
      <div className="menu-container">
        <h1>Hola, {username}!</h1>
        <h2>Elige un modo de juego:</h2>
        <div className="game-modes">
          <button
            className="game-mode-button"
            onClick={() => handleModeSelect("comarcas")}
            aria-label="Jugar modo Comarcas de Aragón"
          >
            🗺️ Comarcas de Aragón
          </button>
          <button
            className="game-mode-button"
            onClick={() => handleModeSelect("rios")}
            aria-label="Jugar modo Ríos de Aragón"
          >
            🌊 Ríos de Aragón
          </button>
          <button
            className="game-mode-button"
            onClick={() => handleModeSelect("municipios")}
            aria-label="Jugar modo Municipios de Aragón"
          >
            🏘️ Municipios de Aragón
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-container">
      <h1>Modo {gameMode}</h1>
      <h2>Elige la dificultad:</h2>
      <div className="game-modes">
        <button
          className="game-mode-button difficulty-easy"
          onClick={() => handleDifficultySelect("facil")}
          aria-label="Seleccionar dificultad fácil"
        >
          😊 Fácil
        </button>
        <button
          className="game-mode-button difficulty-medium"
          onClick={() => handleDifficultySelect("media")}
          aria-label="Seleccionar dificultad media"
        >
          🤔 Media
        </button>
        <button
          className="game-mode-button difficulty-hard"
          onClick={() => handleDifficultySelect("dificil")}
          aria-label="Seleccionar dificultad difícil"
        >
          😤 Difícil
        </button>
      </div>
    </div>
  );
};

export default Menu;
