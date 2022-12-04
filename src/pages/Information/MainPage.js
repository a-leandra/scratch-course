import React from "react";
import "./main_page_style.css";
import video from "../../static/assets/Scratch.mp4";
import { useDispatch } from "react-redux";
import { setNavbarOff } from "../../reducers/pageState";
import { NavLink, Link, useMatch, useResolvedPath } from "react-router-dom";

export default function MainPage() {
  const dispatch = useDispatch();
  dispatch(setNavbarOff());

  return (
    <div>
      <video
        muted
        loop
        autoPlay
        alt="Mapa"
        style={{
          position: "absolute",
          left: 0 + "vw",
          top: 0 + "vh",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
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
        <div className="subtitle" style={{ textAlign: "center" }}>
          <h3>Witaj, mały programisto!</h3>
          <h4>Rozpocznij swoją przygodę z programowaniem już dziś :)</h4>
        </div>

        <Link class="btn btn-primary" to="/zaloguj" className="startBtn">
          ZACZYNAMY
        </Link>
      </header>
    </div>
  );
}
