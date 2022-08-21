const dbTestData = require("../../db/static/dbTestData");
const teacherCrud = require("../../controllers/crud/teacherCrud");
const assert = require("assert");
const Teacher = require("../../models/teacherModel");

describe("Test Teacher model Crud functionality.", () => {
  const teachers = dbTestData.examplaryTeachers;
  const toBeDeleted = teachers.at(-1);
  const toBeUpdated = teachers[0];
  it("add teachers", async () => {
    for (const teacher of teachers) {
      await teacherCrud.tryToAddTeacher(teacher);
    }
  });
  it("remove teacher", async () => {
    await teacherCrud.tryToRemoveTeacher(toBeDeleted.login);
  });
  it("update teacher surname", async () => {
    await teacherCrud.tryToUpdateTeachersVar(toBeUpdated.login, {
      surname: "updated",
    });
  });
  it("get teachers", async () => {
    const savedTeachers = await Teacher.find();
    const surnames = savedTeachers.map((teacher) => teacher.surname);
    assert(surnames.toString() === ["updated", teachers[1].surname].toString());
  });
});
