import React from "react";
import logo from "../statics/logo.png";

const Footer = () => {
  return (
    <div className="ui center aligned container">
      <div className="ui inverted section divider" />
      <img src={logo} className="ui centered mini image" alt="logo" />
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginTop: "1em",
        }}
      >
        <a className="item" href="/#">
          O nas
        </a>
        <p style={{ color: "rgba(34,36,38,.15)" }}>|</p>
        <a className="item" href="/#">
          Kontakt
        </a>
        <p style={{ color: "rgba(34,36,38,.15)" }}>|</p>
        <a className="item" href="/#">
          Polityka prywatności
        </a>
      </div>
    </div>
  );
};

export default Footer;
