import React from "react";
import "./main_page_style.css";
import { useDispatch } from "react-redux";
import { setNavbarOff } from "../../reducers/pageState";

export default function MainPage() {
  const dispatch = useDispatch();
  dispatch(setNavbarOff());

  return (
    <div>
      <div
        style={{
          position: "absolute",
          left: 0 + "vw",
          top: 0 + "vh",
          width: "100%",
          height: "100%",
          background: "#201057e5",
        }}
      />
      <header>
        <h2
          style={{
            textShadow: `5px 5px 1px #7aff8ad0, -5px -5px 1px #7a8affd0, 5px -5px 1px #be7ac0d0, -5px 5px 1px #eeca60d0`,
          }}
        >
          Kurs Scratcha
        </h2>
        <div className="subtitle">
          <h3>Witaj, Mały Programisto!</h3>
          <h4>Rozpocznij przygodę z programowaniem już dziś</h4>
        </div>

        <a href="./zaloguj" className="startBtn">
          ZACZYNAMY
        </a>
      </header>
    </div>
  );
}
