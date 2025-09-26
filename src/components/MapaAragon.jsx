import { useEffect, useState } from "react";
import svgText from "../assets/mapaAragon.svg?raw";
import "../Mapa.css";

export default function Mapa({
  modo,
  elementosIds,
  resultados,
  onClickElemento,
}) {
  const [contornoD, setContornoD] = useState(null);
  const [viewBox, setViewBox] = useState("0 0 39759 54309");
  const [comarcas, setComarcas] = useState([]);
  const [rios, setRios] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
    const root = doc.documentElement;

    const vb = root.getAttribute("viewBox");
    if (vb) setViewBox(vb);

    const contorno = doc.getElementById("contorno");
    if (contorno) setContornoD(contorno.getAttribute("d"));

    const comarcasPaths = Array.from(
      doc.querySelectorAll("#comarcas path")
    ).map((p) => ({
      id: p.id,
      d: p.getAttribute("d"),
      nombre: p.getAttribute("title") || p.id,
    }));
    setComarcas(comarcasPaths);

    const riosPaths = Array.from(doc.querySelectorAll("#rios path")).map(
      (p) => ({
        id: p.id,
        d: p.getAttribute("d"),
        nombre: p.getAttribute("title") || p.id,
      })
    );
    setRios(riosPaths);

    const municipiosCircles = Array.from(
      doc.querySelectorAll("#municipios circle")
    ).map((c) => ({
      id: c.id,
      cx: c.getAttribute("cx"),
      cy: c.getAttribute("cy"),
      r: c.getAttribute("r"),
      nombre: c.getAttribute("title") || c.id,
    }));
    setMunicipios(municipiosCircles);
  }, []);

  let elementos = [];
  if (modo === "comarcas") {
    elementos = comarcas.filter((c) => elementosIds.includes(c.id));
  } else if (modo === "rios") {
    elementos = rios.filter((r) => elementosIds.includes(r.id));
  } else if (modo === "municipios") {
    elementos = municipios.filter((m) => elementosIds.includes(m.id));
  }

  return (
    <div className="svg-container">
      <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
        {contornoD && (
          <path d={contornoD} className="contorno" pointerEvents="none" />
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
}
