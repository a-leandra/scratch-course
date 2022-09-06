import React from "react";
import soonToCome from "../../static/assets/coming-soon.gif";

const ComingSoon = () => {
  return (
    <div
      className="ui raised very padded text container segment"
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: "#c8c8c8",
        minWidth: "80%",
        minHeight: "80%",
      }}
      id="default"
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
