const RouteTester = require("./RouteTester");
const defServerUrl = require("../../config/globalVariables").defaultServerUrl;
const assert = require("assert");
const dbTestData = require("../../db/static/dbTestData");

const generateExamplaryTestStudents =
  require("../../db/dbDataGenerator").generateExamplaryTestStudents;
describe("Test Student model requests functionality.", () => {
  let tester = null;
  let students = [];
  let teacher = dbTestData.examplaryTeachers[0];
  it("prepare", () => {
    tester = new RouteTester(defServerUrl + "/students");
    students = generateExamplaryTestStudents([
      dbTestData.examplaryGroups[0],
      dbTestData.examplaryGroups[1],
    ]);
    assert(tester !== null && students !== []);
  });
  it("request to add students", async () => {
    for (const student of students) {
      await tester.postAndAssert(student);
    }
  });
  it("request to update student", async () => {
    await tester.putAndAssert({
      studentLogin: students[0].login,
      valueName: "surname",
      value: "updated",
    });
  });
  it("request to get all students of teacher", async () => {
    await tester.getAndAssert("/" + teacher.login);
  });
  it("remove student", async () => {
    await tester.deleteAndAssert("/" + students.at(-1).login);
  });
});
