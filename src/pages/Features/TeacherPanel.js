import React from "react";
import GroupList from "../../components/Groups/GroupList";
import StudentList from "../../components/Students/StudentList";

const TeacherPanel = () => {
  return (
    <div
      className="ui raised very padded text container segment"
      style={{
        flexDirection: "row",
      }}
      id="default"
    >
      <GroupList />
      <StudentList />
    </div>
  );
};

export default TeacherPanel;
