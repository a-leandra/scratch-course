import React, { createContext, useState, useEffect } from "react";

export const StudentListContext = createContext();

const StudentListContextProvider = ({ children }) => {
  const [allStudents, setAllStudents] = useState([]);
  const [groupStudents, setGroupStudents] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [reverseSort, setReverseSort] = useState(true);

  useEffect(() => {
    setAllStudents([
      {
        name: "Alicja",
        surname: "Bobkowska",
        progress: 34,
        avatarSrc: "",
        groupCode: 123,
        id: 0,
      },
      {
        name: "Bogdan",
        surname: "Kawka",
        progress: 78,
        avatarSrc: "",
        groupCode: 123,
        id: 1,
      },
      {
        name: "Marta",
        surname: "Kijek",
        progress: 24,
        avatarSrc: "",
        groupCode: 123,
        id: 2,
      },
      {
        name: "Irena",
        surname: "Turek",
        progress: 100,
        avatarSrc: "",
        groupCode: 987,
        id: 3,
      },
      {
        name: "Krzysztof",
        surname: "Kowalski",
        progress: 50,
        avatarSrc: "",
        groupCode: 987,
        id: 4,
      },
      {
        name: "Filemon",
        surname: "Mruczek",
        progress: 0,
        avatarSrc: "",
        groupCode: 987,
        id: 5,
      },
      {
        name: "Anna",
        surname: "Wasilewska",
        progress: 49,
        avatarSrc: "",
        groupCode: 987,
        id: 6,
      },
    ]);
  }, []);

  const countOverallProgress = (students) => {
    if (students.length < 1) {
      return 0;
    }
    let studentProgress = students.map((student) => student.progress);
    return Math.round(
      studentProgress.reduce((a, b) => a + b, 0) / students.length
    );
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
    <StudentListContext.Provider
      value={{
        groupStudents,
        overallProgress,
        updateGroupData,
        removeStudent,
        sortStudents,
      }}
    >
      {children}
    </StudentListContext.Provider>
  );
};

export default StudentListContextProvider;
