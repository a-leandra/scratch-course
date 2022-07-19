import React from "react";
import logo from "../statics/logo.png";
import { Link } from "react-router-dom";

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
        <Link className="item" to="/o-nas">
          O nas
        </Link>
        <p style={{ color: "rgba(34,36,38,.15)" }}>|</p>
        <Link className="item" to="/kontakt">
          Kontakt
        </Link>
        <p style={{ color: "rgba(34,36,38,.15)" }}>|</p>
        <Link className="item" to="/polityka-prywatnosci">
          Polityka prywatności
        </Link>
      </div>
    </div>
  );
};

export default Footer;
