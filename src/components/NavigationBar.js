import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const [navItems] = useState([
    { bookMark: "panel-nauczyciela", name: "Panel nauczyciela", id: 0 },
    { bookMark: "mapa-poziomow", name: "Mapa poziomów", id: 1 },
    { bookMark: "profil", name: "Profil", id: 2 },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="ui three item menu">
      {navItems.map((item) => {
        return (
          <Link
            key={item.id}
            className={item.id === activeIndex ? "active item" : "item"}
            to={item.bookMark}
            style={{
              background: item.id === activeIndex ? "#1374bf" : "#2992e3",
              color: "white",
            }}
            onClick={() => setActiveIndex(item.id)}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationBar;
