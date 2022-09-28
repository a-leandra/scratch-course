import React from "react";

const Failed = ({ failed }) => {
  return (
    <div
      className="item"
      style={{
        overflow: "auto",
        maxHeight: "100px",
        minHeight: "50px",
      }}
    >
      <div
        className="content"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <div className="header">{failed}</div>
        <i className="red times icon"></i>
      </div>
    </div>
  );
};

export default Failed;
