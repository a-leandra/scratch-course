import React from "react";
import "../../index.css";
import MapFields from "./MapFields";
import mapa_poziomy from "../../static/assets/mapa_poziomy.png";

export default function MapComponent() {
  return (
    <div>
      <img
        src={mapa_poziomy}
        alt="Mapa"
        style={{
          position: "absolute",
          left: 0 + "vw",
          top: 0 + "vh",
          width: "100%",
          height: "100%",
        }}
      />
      <MapFields />
    </div>
  );
}
