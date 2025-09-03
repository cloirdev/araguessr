import React from "react";

export default function PanelQuiz({ pregunta, elementoActual }) {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "300px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>{pregunta}</h2>
      <h3>{elementoActual?.nombre}</h3>
    </div>
  );
}
