import React from "react";
import soonToCome from "../statics/coming-soon.gif";

const ComingSoon = () => {
  return (
    <div
      className="ui raised very padded text container segment"
      style={{
        minWidth: "1200px",
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        background: "#c8c8c8",
      }}
    >
      <img
        src={soonToCome}
        style={{ height: "96px", width: "150px" }}
        alt="coming-soon"
      />
    </div>
  );
};

export default ComingSoon;
