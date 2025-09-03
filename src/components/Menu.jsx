import { useState } from "react";
import "../Menu.css";

const Menu = ({ onStartGame }) => {
  const [username, setUsername] = useState("");
  const [showGameModes, setShowGameModes] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onStartGame(username.trim(), "comarcas");
    }
  };

  const handleGameModeSelect = (gameMode) => {
    onStartGame(username, gameMode);
  };

  const modosDeJuego = [
    {
      id: "comarcas",
      nombre: "Comarcas",
      descripcion: "Aprende las comarcas de Aragón",
      icono: "🗺️",
    },
  ];

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
          onClick={() => handleGameModeSelect("montanas")}
        >
          Montañas de Aragón (Círculos)
        </button>
        <button
          className="game-mode-button"
          onClick={() => handleGameModeSelect("triangulos")}
        >
          Montañas de Aragón (Triángulos)
        </button>
      </div>
    </div>
  );
};

export default Menu;
