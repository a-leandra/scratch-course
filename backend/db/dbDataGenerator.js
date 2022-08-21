const { testNamePrefix } = require("./static/dbTestData");
const { sampleTasks } = require("./static/dbSampleData");

const generateExamplaryTestStudents = (groups) => {
  const examplaryStudents = [];
  for (const group of groups) {
    const studentsNr = generateRandomInt();
    for (var i = 0; i < studentsNr; i++) {
      examplaryStudents.push(createTestStudent(group));
    }
  }
  return examplaryStudents;
};

const createTestStudent = (group) => {
  return {
    login: generateRandomString(),
    password: generateRandomString(),
    name: testNamePrefix + generateRandomString(),
    surname: generateRandomString(),
    groupName: group.name,
  };
};

const generateRandomInt = (max = 4) => {
  return Math.floor(Math.random() * max);
};

const generateRandomString = (length = 10) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generateProgressForNewStudentForEachTask = (studentLogin) => {
  const allTasksProgress = [];
  sampleTasks.forEach((task) => {
    const progress = {
      taskNumber: task.number,
      studentLogin: studentLogin,
      status: "inactive",
      isHomework: false,
    };
    allTasksProgress.push(progress);
  });
  return allTasksProgress;
};

const generateProgressForNewStudentsForEachTask = (students) => {
  const allTaskAllStudentsProgress = [];
  students.forEach((student) => {
    const allTasksProgress = generateProgressForNewStudentForEachTask(
      student.login
    );
    allTaskAllStudentsProgress.push(...allTasksProgress);
  });
  return allTaskAllStudentsProgress;
};

module.exports = {
  generateProgressForNewStudentsForEachTask,
  generateExamplaryTestStudents,
};
