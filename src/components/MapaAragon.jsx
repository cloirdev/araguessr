import { useMemo, memo } from "react";
import svgText from "../assets/mapaAragon.svg?raw";
import "../Mapa.css";

const Mapa = memo(function Mapa({
  modo,
  elementosIds,
  resultados,
  onClickElemento,
}) {
  // Parsear SVG solo una vez con useMemo
  const svgData = useMemo(() => {
    const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
    const root = doc.documentElement;

    const viewBox = root.getAttribute("viewBox") || "0 0 39759 54309";
    const contorno = doc.getElementById("contorno");
    const contornoD = contorno ? contorno.getAttribute("d") : null;

    const comarcas = Array.from(
      doc.querySelectorAll("#comarcas path")
    ).map((p) => ({
      id: p.id,
      d: p.getAttribute("d"),
      nombre: p.getAttribute("title") || p.id,
    }));

    const rios = Array.from(doc.querySelectorAll("#rios path")).map(
      (p) => ({
        id: p.id,
        d: p.getAttribute("d"),
        nombre: p.getAttribute("title") || p.id,
      })
    );

    const municipios = Array.from(
      doc.querySelectorAll("#municipios circle")
    ).map((c) => ({
      id: c.id,
      cx: c.getAttribute("cx"),
      cy: c.getAttribute("cy"),
      r: c.getAttribute("r"),
      nombre: c.getAttribute("title") || c.id,
    }));

    return { viewBox, contornoD, comarcas, rios, municipios };
  }, []);

  // Filtrar elementos según modo
  const elementos = useMemo(() => {
    let filtered = [];
    if (modo === "comarcas") {
      filtered = svgData.comarcas.filter((c) => elementosIds.includes(c.id));
    } else if (modo === "rios") {
      filtered = svgData.rios.filter((r) => elementosIds.includes(r.id));
    } else if (modo === "municipios") {
      filtered = svgData.municipios.filter((m) => elementosIds.includes(m.id));
    }
    return filtered;
  }, [modo, elementosIds, svgData]);

  return (
    <div className="svg-container">
      <svg viewBox={svgData.viewBox} preserveAspectRatio="xMidYMid meet">
        {svgData.contornoD && (
          <path d={svgData.contornoD} className="contorno" pointerEvents="none" />
        )}

        {elementos.map((el) => {
          let clase = "";
          switch (modo) {
            case "rios":
              clase = "rio";
              break;
            case "municipios":
              clase = "municipio";
              break;
            default:
              clase = "comarca";
              break;
          }

          if (resultados[el.id] === "acierto") clase += " acierto";
          if (resultados[el.id] === "fallo") clase += " fallo";

          if (modo === "municipios") {
            return (
              <circle
                key={el.id}
                cx={el.cx}
                cy={el.cy}
                r={el.r}
                className={clase}
                onClick={() => onClickElemento(el.id)}
              />
            );
          } else {
            return (
              <path
                key={el.id}
                d={el.d}
                className={clase}
                onClick={() => onClickElemento(el.id)}
              />
            );
          }
        })}
      </svg>
    </div>
  );
});

export default Mapa;
