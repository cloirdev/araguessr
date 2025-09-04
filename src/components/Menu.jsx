import { useState } from "react";
import "../Menu.css";

const Menu = ({ onStartGame }) => {
  const [username, setUsername] = useState("");
  const [showGameModes, setShowGameModes] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setShowGameModes(true);
    }
  };

  const handleGameModeSelect = (gameMode) => {
    onStartGame(username.trim(), gameMode);
  };

  if (!showGameModes) {
    return (
      <div className="menu-container">
        <h1>Geografía de Aragón</h1>
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

  return (
    <div className="menu-container">
      <h1>Hola, {username}!</h1>
      <h2>Elige un modo de juego:</h2>
      <div className="game-modes">
        <button
          className="game-mode-button"
          onClick={() => handleGameModeSelect("comarcas")}
        >
          Comarcas de Aragón
        </button>
        <button
          className="game-mode-button"
          onClick={() => handleGameModeSelect("rios")}
        >
          Ríos de Aragón
        </button>
        {/* Añade más botones para otros modos si lo deseas */}
      </div>
    </div>
  );
};

export default Menu;
