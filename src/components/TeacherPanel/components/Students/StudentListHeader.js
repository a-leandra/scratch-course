import React from "react";
import { useSelector } from "react-redux";

const StudentListHeader = () => {
  const group = useSelector((state) => state.studentSearch.studentGroup);
  const students = useSelector((state) => state.studentSearch.filtered);
  const groupProgress = useSelector(
    (state) => state.studentSearch.overallProgress
  );
  return (
    <div
      className="header"
      style={{ minHeight: "50px", verticalAlign: "bottom", lineHeight: "50px" }}
    >
      {group.name !== "" ? (
        <p>
          <strong>Grupa {group.name}</strong> | {students.length} uczniów |{" "}
          {groupProgress}% ukończenia
        </p>
      ) : (
        <p>Wybierz grupę...</p>
      )}
    </div>
  );
};

export default StudentListHeader;
