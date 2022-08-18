import React from "react";

const Student = ({ student, handleClick, noAvatar }) => {
  return (
    <div
      className="item"
      style={{ overflow: "auto", maxHeight: "100px", minHeight: "50px" }}
      onClick={(event) => handleClick(event, student)}
    >
      <img className="ui avatar image" src={noAvatar} alt="avatar" />
      <div className="content">
        <div className="header">
          {student.name} {student.surname} {student.progress}%
        </div>
      </div>
    </div>
  );
};

export default Student;
