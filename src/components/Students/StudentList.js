import React, { useContext, useState } from "react";
import { GroupListContext } from "../../contexts/GroupListContext";
import { StudentListContext } from "../../contexts/StudentListContext";
import StudentListHeader from "./StudentListHeader";
import noAvatar from "./../../statics/no-avatar.png";
import SearchBar from "../SearchBar";
import Student from "./Student";

const StudentList = () => {
  const { groupStudents, overallProgress, removeStudent, sortStudents } =
    useContext(StudentListContext);
  const { chosenGroup } = useContext(GroupListContext);

  const [keyword, setKeyword] = useState("");

  const removeStudentFromList = (e, student) => {
    removeStudent(student.id);
  };

  const filterByKeyword = (student) => {
    let fullName = (student.name + " " + student.surname).toLowerCase();
    if (fullName.startsWith(keyword.toLowerCase())) {
      return true;
    }
    return false;
  };

  return (
    <div
      className="ui container center aligned"
      style={{ marginTop: "1em", flex: 1 }}
    >
      <StudentListHeader
        chosenGroup={chosenGroup}
        groupStudents={groupStudents}
        overallProgress={overallProgress}
      />
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        sort={sortStudents}
      />
      <div
        className="ui middle aligned selection list"
        style={{ overflow: "auto", maxHeight: "400px" }}
      >
        {groupStudents.filter(filterByKeyword).map((student) => {
          return (
            <Student
              key={student.id}
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
