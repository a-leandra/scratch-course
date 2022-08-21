const findAllStudentsOfTeacher =
  require("./studentCrud").findAllStudentsOfTeacher;

let Progress = require("../../models/progressModel");

const getStudentsOfTeacherAndTheirStat = async (teacherLogin) => {
  const allStudents = await findAllStudentsOfTeacher(teacherLogin);
  const data = [];
  for (const student of allStudents) {
    const allProgress = await Progress.find({ student: student });
    data.push({
      id: student._id,
      name: student.name,
      surname: student.surname,
      progress: avgOfDoneExc(allProgress),
      group: student.group,
    });
  }
  return data;
};

const avgOfDoneExc = (allProgress) => {
  const allStatus = allProgress.map((progress) =>
    progress.status === "done" ? 1 : 0
  );
  return allStatus.reduce((a, b) => a + b, 0) / allStatus.length;
};

module.exports = getStudentsOfTeacherAndTheirStat;
