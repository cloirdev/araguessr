import { getStats, getRecord } from "../utils/storage";
import { formatearTiempo } from "../utils/tiempo";
import { GAME_MODES, DIFFICULTY_LEVELS } from "../constants/gameConstants";
import "../Stats.css";

export default function Stats({ onClose }) {
  const stats = getStats();
  
  const precisionPromedio = stats.totalIntentos > 0
    ? Math.round((stats.totalAciertos / stats.totalIntentos) * 100)
    : 0;
  
  const tiempoPromedio = stats.totalPartidas > 0
    ? Math.round(stats.tiempoTotal / stats.totalPartidas)
    : 0;

  // Obtener récords por modo y dificultad
  const records = [];
  Object.values(GAME_MODES).forEach(modo => {
    if (modo === "contraReloj" || modo === "multiplayer") return;
    
    const dificultades = modo === "comarcas" 
      ? [null] 
      : Object.values(DIFFICULTY_LEVELS);
    
    dificultades.forEach(dif => {
      const record = getRecord(modo, dif);
      if (record) {
        records.push({
          modo,
          dificultad: dif,
          ...record,
        });
      }
    });
  });

  // Elementos más difíciles
  const elementosDificiles = Object.entries(stats.elementosDificiles || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="stats-overlay">
      <div className="stats-container">
        <div className="stats-header">
          <h2>📊 Estadísticas</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="stats-content">
          <section className="stats-section">
            <h3>Resumen Global</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-value">{stats.totalPartidas}</span>
                <span className="stat-label">Partidas Jugadas</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{precisionPromedio}%</span>
                <span className="stat-label">Precisión Promedio</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{formatearTiempo(tiempoPromedio)}</span>
                <span className="stat-label">Tiempo Promedio</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{stats.totalAciertos}</span>
                <span className="stat-label">Aciertos Totales</span>
              </div>
            </div>
          </section>

          {records.length > 0 && (
            <section className="stats-section">
              <h3>🏆 Récords Personales</h3>
              <div className="records-list">
                {records.map((record, idx) => (
                  <div key={idx} className="record-item">
                    <div className="record-info">
                      <span className="record-mode">
                        {record.modo.charAt(0).toUpperCase() + record.modo.slice(1)}
                        {record.dificultad && ` - ${record.dificultad}`}
                      </span>
                      <span className="record-date">
                        {new Date(record.fecha).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="record-stats">
                      <span>{record.puntuacion} pts</span>
                      <span>{formatearTiempo(record.tiempo)}</span>
                      <span>{record.aciertos}/{record.intentos}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {elementosDificiles.length > 0 && (
            <section className="stats-section">
              <h3>🎯 Elementos Más Difíciles</h3>
              <div className="difficult-list">
                {elementosDificiles.map(([elementoId, fallos], idx) => (
                  <div key={elementoId} className="difficult-item">
                    <span className="difficult-rank">#{idx + 1}</span>
                    <span className="difficult-name">{elementoId}</span>
                    <span className="difficult-count">{fallos} fallos</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
