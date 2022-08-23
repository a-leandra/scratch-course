import { createSlice } from "@reduxjs/toolkit";

const filterByGroup = (students, groupId) => {
  const groupStudents = [];
  for (const student of students) {
    if (student.group === groupId) {
      groupStudents.push(student);
    }
  }
  return groupStudents;
};

const filter = (students, keyword) => {
  const filtered = [];
  for (const student of students) {
    const fullName = student.name + " " + student.surname;
    if (fullName.startsWith(keyword.toUpperCase())) {
      filtered.push(student);
    }
  }
  return filtered;
};

const countEvgProgress = (students) => {
  if (students.length === 0) {
    return 0;
  } else {
    return (
      students.map((student) => student.progress).reduce((a, b) => a + b, 0) /
      students.length
    );
  }
};

const studentSearchSlice = createSlice({
  name: "studentSearch",
  initialState: {
    students: [],
    group: [],
    filtered: [],
    studentGroup: {},
    keyword: "",
    reverseSort: false,
    overallProgress: 0,
  },
  reducers: {
    setStudents(state, action) {
      state.students = action.payload;
    },
    setStudentGroupAndPrepareData(state, action) {
      state.studentGroup = action.payload;
      state.group = filterByGroup(state.students, state.studentGroup);
      state.overallProgress = countEvgProgress(state.group);
      state.filtered = state.group;
    },
    sort(state) {
      let sortedStudents = state.filtered.sort((a, b) =>
        (a.name + a.surname).localeCompare(b.name + b.surname)
      );
      state.filtered = state.reverseSort
        ? sortedStudents.reverse()
        : sortedStudents;
      state.reverseSort = !state.reverseSort;
    },
    setKeyAndFilter(state, action) {
      state.keyword = action.payload;
      state.filtered = filter(state.group, state.keyword);
    },
  },
});

export const {
  setStudents,
  setStudentGroupAndPrepareData,
  sort,
  setKeyAndFilter,
} = studentSearchSlice.actions;

export default studentSearchSlice.reducer;
