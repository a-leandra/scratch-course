import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import pages from "../data/pages.json";

const Footer = () => {
  const [footerPages] = useState(pages.footerPages);
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
        {footerPages.map((page) => {
          return (
            <React.Fragment key={page.id}>
              <Link className="item" to={page.bookMark}>
                {page.name}
              </Link>
              {page !== footerPages.at(-1) ? (
                <p style={{ color: "rgba(34,36,38,.15)" }}>|</p>
              ) : (
                []
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
