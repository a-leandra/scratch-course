const dbTestData = require("../../db/static/dbTestData");
const assert = require("assert");

const studentCrud = require("../../controllers/crud/studentCrud");
const generateExamplaryTestStudents =
  require("../../db/dbDataGenerator").generateExamplaryTestStudents;
describe("Test Student model Crud functionality.", () => {
  let students = [];
  let toBeRemoved = null;
  let toBeUpdated = null;
  let teacher = dbTestData.examplaryTeachers[0];
  it("prepare", async () => {
    students = generateExamplaryTestStudents([
      dbTestData.examplaryGroups[1],
      dbTestData.examplaryGroups[2],
    ]);
    toBeRemoved = students.at(-1);
    toBeUpdated = students[0];
    assert(students !== [] && toBeRemoved !== null && toBeUpdated !== null);
  });
  it("add students", async () => {
    for (const student of students) {
      await studentCrud.tryToAddStudent(student);
    }
  });
  it("remove student", async () => {
    await studentCrud.tryToRemoveStudent(toBeRemoved.login);
  });
  it("update student surname", async () => {
    await studentCrud.tryToUpdateStudentsVar(toBeUpdated.login, {
      surname: "updated",
    });
  });
  it("get students of teacher", async () => {
    const teacherStudents = await studentCrud.findAllStudentsOfTeacher(
      teacher.login
    );
    const savedStudentsNames = teacherStudents.map((student) => student.name);
    const orgStudentsNames = students.map((student) => student.name);
    assert(orgStudentsNames.toString().includes(savedStudentsNames));
  });
});
