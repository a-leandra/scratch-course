import React from "react";
import GroupList from "../../components/Groups/GroupList";
import StudentList from "../../components/Students/StudentList";
import GroupListContextProvider from "../../contexts/GroupListContext";
import StudentListContextProvider from "../../contexts/StudentListContext";

const TeacherPanel = () => {
  return (
    <div
      className="ui raised very padded text container segment"
      style={{
        minWidth: "1200px",
        minHeight: "600px",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      <StudentListContextProvider>
        <GroupListContextProvider>
          <GroupList />
          <StudentList />
        </GroupListContextProvider>
      </StudentListContextProvider>
    </div>
  );
};

export default TeacherPanel;
