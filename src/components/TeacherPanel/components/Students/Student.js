import React from "react";
import { useDispatch } from "react-redux";
import { REMOVE_STUDENT_FROM_GROUP } from "../../static/constants/teacherPanelConst";
import { tryToMakeRequest } from "../../actions/teacherPanelReq";

const Student = ({ student, noAvatar }) => {
  const dispatch = useDispatch();

  const removeStudentWrapper = async (e, student) => {
    await tryToMakeRequest(
      {
        type: REMOVE_STUDENT_FROM_GROUP,
        param: { email: student.email, code: student.group },
      },
      dispatch
    );
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
          {student.name} {student.surname} {(student.progress) * 10}%
        </div>
        <div onClick={(event) => removeStudentWrapper(event, student)}>
          <i className="close icon"></i>
        </div>
      </div>
    </div>
  );
};

export default Student;
