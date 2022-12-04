import React, { useEffect, useState } from "react";
import GroupList from "../components/Groups/GroupList";
import StudentList from "../components/Students/StudentList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TeacherPanel = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isTeacher === false) {
      navigate("/mapa-poziomow");
    } else if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <div
      className="ui raised very padded text container segment"
      style={{
        flexDirection: "column",
        minWidth: "80%",
        minHeight: "80%",
      }}
      id="default"
    >
      <h1 className="heading">Panel nauczyciela</h1>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <GroupList />
        <StudentList />
      </div>
    </div>
  );
};

export default TeacherPanel;
