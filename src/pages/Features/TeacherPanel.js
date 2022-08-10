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
        flexDirection: "column",
        minWidth:'80%',
        minHeight:'80%'
      }}
      id="default"
    >
      <h1 className="heading">Panel nauczyciela</h1>
      <hr />
      <div style={{
        display:'flex',
        flexDirection: "row",
      }}>
        <StudentListContextProvider>
          <GroupListContextProvider>
            <GroupList />
            <StudentList />
          </GroupListContextProvider>
        </StudentListContextProvider>
      </div>
    </div>
  );
};

export default TeacherPanel;
