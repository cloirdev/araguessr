import "../Mapa.css";

export default function MapaAragon({ comarcas, resultados, onClickElemento }) {
  return (
    <div className="svg-container">
      <svg viewBox="0 0 35000 43000" preserveAspectRatio="xMidYMid meet">
        {comarcas.map((comarca) => {
          let clase = "comarca";
          if (resultados[comarca.id] === "acierto") {
            clase += " acierto";
          } else if (resultados[comarca.id] === "fallo") {
            clase += " fallo";
          }
          return (
            <path
              key={comarca.id}
              d={comarca.d}
              className={clase}
              onClick={() => onClickElemento(comarca.id)}
              stroke="#ffffff"
              strokeWidth="100"
              fillOpacity={resultados[comarca.id] ? 0.7 : 0.5}
            />
          );
        })}
      </svg>
    </div>
  );
}
