import React from "react";

const StudentListHeader = ({ chosenGroup, groupStudents, overallProgress }) => {
  return (
    <div
      className="header"
      style={{ minHeight: "50px", verticalAlign: "bottom", lineHeight: "50px" }}
    >
      {chosenGroup.name !== "" ? (
        <p>
          <strong>Grupa {chosenGroup.name}</strong> | {groupStudents.length}{" "}
          uczniów | {overallProgress}% ukończenia
        </p>
      ) : (
        <p>Wybierz grupę...</p>
      )}
    </div>
  );
};

export default StudentListHeader;
