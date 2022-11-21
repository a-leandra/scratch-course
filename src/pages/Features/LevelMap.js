import React from "react";
import "../../index.css";
import MapFields from "./MapFields";
import mapa_poziomy from "../../static/assets/mapa_poziomy.png";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MapComponent() {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);
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
