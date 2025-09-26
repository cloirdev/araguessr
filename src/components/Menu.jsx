import { useState } from "react";
import "../Menu.css";

const Menu = ({ onStartGame }) => {
  const [username, setUsername] = useState("");
  const [showGameModes, setShowGameModes] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

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
    setDifficulty(diff);
    onStartGame(username.trim(), gameMode, diff);
  };

  if (!showGameModes) {
    return (
      <div className="menu-container">
        <h1>Araguessr</h1>
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
          />
          <button type="submit">Continuar</button>
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
          >
            Comarcas de Aragón
          </button>
          <button
            className="game-mode-button"
            onClick={() => handleModeSelect("rios")}
          >
            Ríos de Aragón
          </button>
          <button
            className="game-mode-button"
            onClick={() => handleModeSelect("municipios")}
          >
            Municipios de Aragón
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
          className="game-mode-button"
          onClick={() => handleDifficultySelect("facil")}
        >
          Fácil
        </button>
        <button
          className="game-mode-button"
          onClick={() => handleDifficultySelect("media")}
        >
          Media
        </button>
        <button
          className="game-mode-button"
          onClick={() => handleDifficultySelect("dificil")}
        >
          Difícil
        </button>
      </div>
    </div>
  );
};

export default Menu;
