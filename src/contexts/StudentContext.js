import React, { createContext, useState, useEffect } from "react";
import students from "../data/students.json";

export const StudentContext = createContext();

const StudentContextProvider = ({ children }) => {
  const [allStudents, setAllStudents] = useState([]);
  const [groupStudents, setGroupStudents] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [reverseSort, setReverseSort] = useState(true);

  useEffect(() => {
    setAllStudents(students.students);
  }, []);

  const countOverallProgress = (students) => {
    if (students.length < 1) {
      return 0;
    }
    let studentProgress = students.map((student) => student.progress);
    let sumProgress = studentProgress.reduce((a, b) => a + b, 0);
    return Math.round(sumProgress / students.length);
  };

  const updateGroupData = (code) => {
    let chosenGroupStudents = allStudents.filter(
      (students) => students.groupCode === code
    );
    setGroupStudents(chosenGroupStudents);
    let progress = countOverallProgress(chosenGroupStudents);
    setOverallProgress(progress);
  };

  const removeStudent = (id) => {
    let updatedGroup = groupStudents.filter((student) => student.id !== id);
    setGroupStudents(updatedGroup);
    let progress = countOverallProgress(updatedGroup);
    setOverallProgress(progress);
    setAllStudents(allStudents.filter((student) => student.id !== id));
  };

  const sortStudents = () => {
    let sortedGroupStudents = groupStudents.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setGroupStudents(
      reverseSort ? sortedGroupStudents.reverse() : sortedGroupStudents
    );
    setReverseSort(!reverseSort);
  };

  return (
    <StudentContext.Provider
      value={{
        groupStudents,
        overallProgress,
        updateGroupData,
        removeStudent,
        sortStudents,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
