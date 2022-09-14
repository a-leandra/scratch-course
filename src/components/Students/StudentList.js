import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentListHeader from "./StudentListHeader";
import noAvatar from "./../../static/assets/no-avatar.png";
import SearchBar from "../Layouts/SearchBar";
import Student from "./Student";
import { fetchStudents } from "../../actions/teacherPanelReq";
const axios = require("axios");
const {
  setStudents,
  sort,
  setKeyAndFilter,
} = require("../../reducers/teacherPanel/studentSearch");

const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.studentSearch.filtered);
  const group = useSelector((state) => state.studentSearch.studentGroup);
  const groupProgress = useSelector(
    (state) => state.studentSearch.overallProgress
  );
  const keyword = useSelector((state) => state.studentSearch.keyword);

  const removeStudentFromList = (e, student) => {
    // TODO
  };

  useEffect(() => {
    dispatch(fetchStudents(setStudents));
  }, []);

  return (
    <div
      className="ui container center aligned"
      style={{ marginTop: "1em", flex: 1 }}
    >
      <StudentListHeader
        chosenGroup={group}
        groupStudents={students}
        overallProgress={groupProgress}
      />
      <SearchBar
        keyword={keyword}
        setKeyword={(keyword) => {
          dispatch(setKeyAndFilter(keyword));
        }}
        sort={() => {
          dispatch(sort());
        }}
      />
      <div
        className="ui middle aligned selection list"
        style={{ overflow: "auto", maxHeight: "400px" }}
      >
        {students.map((student) => {
          return (
            <Student
              key={student.name + student.surname}
              student={student}
              handleClick={removeStudentFromList}
              noAvatar={noAvatar}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StudentList;
