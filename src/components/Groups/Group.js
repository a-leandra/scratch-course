import React from "react";

const Group = ({ group, handleClick }) => {
  return (
    <div
      className="item"
      style={{ overflow: "auto", maxHeight: "100px", minHeight: "50px" }}
      onClick={(event) => handleClick(event, group)}
    >
      <div
        className="content"
        style={{ display: "flex", justifyContent: "center", gap: "10px" }}
      >
        <div className="header">{group.name}</div>
        <div>#{group._id}</div>
      </div>
    </div>
  );
};

export default Group;
