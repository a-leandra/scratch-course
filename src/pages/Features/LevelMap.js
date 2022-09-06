import React, { useEffect, useState } from "react";
import "../../index.css";
import MapFields from "./MapFields";
import mapa_poziomy from "../../static/assets/mapa_poziomy.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function MapComponent() {
  const coordinates = [
    { x: 15, y: 55.5, active: true, current: false },
    { x: 35, y: 51.5, active: false, current: true },
    { x: 50, y: 61.5, active: false, current: false },
    { x: 70, y: 62, active: false, current: false },
    { x: 90, y: 60, active: false, current: false },
    { x: 80, y: 36, active: false, current: false },
    { x: 60, y: 38, active: false, current: false },
    { x: 37, y: 31.5, active: false, current: false },
    { x: 17, y: 12.5, active: false, current: false },
  ];

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/panel-nauczyciela");
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
      <MapFields coordinates={coordinates} />
    </div>
  );
}
