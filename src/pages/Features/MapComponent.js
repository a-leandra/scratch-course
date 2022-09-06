import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MapFields from "./MapFields";
import mapa_poziomy from "./static/assets/mapa_poziomy.png";

export default function MapComponent() {
  const coordinates = [
    { x: 15, y: 26.5, active: true, current: false },
    { x: 35, y: 24, active: false, current: true },
    { x: 50, y: 29, active: false, current: false },
    { x: 70, y: 30, active: false, current: false },
    { x: 92, y: 29, active: false, current: false },
    { x: 80, y: 17, active: false, current: false },
    { x: 60, y: 18, active: false, current: false },
    { x: 40, y: 15, active: false, current: false },
    { x: 17, y: 5.2, active: false, current: false },
  ];
  return (
    <div>
      <img
        src={mapa_poziomy}
        style={{
          position: "absolute",
          left: 0 + "vw",
          top: 0 + "vw",
          width: "100%",
          height: "100%",
        }}
      />
      <MapFields coordinates={coordinates} />
    </div>
  );
}
