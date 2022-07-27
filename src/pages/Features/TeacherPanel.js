import React from "react";
import GroupList from "../../components/Groups/GroupList";
import StudentList from "../../components/Students/StudentList";
import GroupListContextProvider from "../../contexts/GroupContext";
import StudentListContextProvider from "../../contexts/StudentContext";

const TeacherPanel = () => {
  return (
    <div
      className="ui raised very padded text container segment"
      style={{
        flexDirection: "row",
      }}
      id="default"
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
