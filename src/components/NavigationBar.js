import React from "react";

const NavigationBar = () => {
  return (
    <div className="ui three item menu">
      <a
        className="active item"
        href="/#"
        style={{ background: "#1374bf", color: "white" }}
      >
        Panel nauczyciela
      </a>
      <a
        className="item"
        href="/#"
        style={{ background: "#2992e3", color: "white" }}
      >
        Mapa zadań
      </a>
      <a
        className="item"
        href="/#"
        style={{ background: "#2992e3", color: "white" }}
      >
        Profil
      </a>
    </div>
  );
};

export default NavigationBar;
