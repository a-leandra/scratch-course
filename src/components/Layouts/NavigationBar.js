import React, { useState } from "react";
import { Link } from "react-router-dom";
import pages from "../../data/pages.json";

const NavigationBar = () => {
  const [navPages] = useState(pages.navBarPages);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="ui three item menu">
      {navPages.map((page) => {
        return (
          <Link
            key={page.id}
            className={page.id === activeIndex ? "active item" : "item"}
            to={page.bookMark}
            style={{
              background: page.id === activeIndex ? "#1374bf" : "#2992e3",
              color: "white",
            }}
            onClick={() => setActiveIndex(page.id)}
          >
            {page.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationBar;
