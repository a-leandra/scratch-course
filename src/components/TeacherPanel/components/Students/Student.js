import React from "react";
import { useDispatch } from "react-redux";
import { addRequest } from "../../reducers/requests";
import { REMOVE_STUDENT_FROM_GROUP } from "../../static/constants/teacherPanelConst";

const Student = ({ student, noAvatar }) => {
  const dispatch = useDispatch();

  const removeStudentWrapper = async (e, student) => {
    const submit = {
      type: REMOVE_STUDENT_FROM_GROUP,
      param: { emai: student.email, code: student.group },
      info: " Wykreśl ucznia " + student.name + " " + student.surname,
      color: { color: "red" },
    };
    dispatch(addRequest(submit));
  };

  return (
    <div
      className="item"
      style={{ overflow: "auto", maxHeight: "100px", minHeight: "50px" }}
    >
      <div
        className="content"
        style={{ display: "flex", justifyContent: "center", gap: "10px" }}
      >
        <img className="ui avatar image" src={noAvatar} alt="avatar" />
        <div className="header">
          {student.name} {student.surname} {(student.progress - 1) * 10}%
        </div>
        <div onClick={(event) => removeStudentWrapper(event, student)}>
          <i className="close icon"></i>
        </div>
      </div>
    </div>
  );
};

export default Student;
