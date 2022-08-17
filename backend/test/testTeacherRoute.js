const assert = require("assert");
const TeacherRouteTester = require("./RouteTesters/TeacherRouteTester");
const GroupRouteTester = require("./RouteTesters/GroupRouteTester");
const StudentRouteTester = require("./RouteTesters/StudentRouteTester");
const {
  examplaryTeachers,
  examplaryGroups,
  generateExamplaryStudents,
} = require("./examplaryData");
const url =
  require("../config/globalVariables").defaultServerUrl + "/panel-nauczyciela";

describe("Test Teacher model Crud functionality.", () => {
  let teacherTester = null;
  it("prepare", () => {
    teacherTester = new TeacherRouteTester(url + "/teachers");
    assert(teacherTester !== null);
  });
  it("create", async () => {
    for (const teacher of examplaryTeachers) {
      await teacherTester.postAndAssert(teacher);
    }
  });
  it("read", async () => {
    await teacherTester.getAllAndAssert(examplaryTeachers);
  });
  it("delete", async () => {
    const toBeDeleted = examplaryTeachers.at(-1);
    await teacherTester.deleteAndAssert("/" + toBeDeleted.login, toBeDeleted);
  });
});

describe("Test Group model Crud functionality.", () => {
  let groupTester = null;
  let toBeDeleted = examplaryGroups.at(-1);
  let getParams = "/" + examplaryGroups[0].teacherLogin;
  let delParams = "/" + toBeDeleted.name + "/" + toBeDeleted.teacherLogin;
  it("prepare", () => {
    groupTester = new GroupRouteTester(url + "/groups");
    assert(groupTester !== null);
  });
  it("create", async () => {
    for (const group of examplaryGroups) {
      await groupTester.postAndAssert(group);
    }
  });
  it("read", async () => {
    await groupTester.getAndAssert(getParams, examplaryGroups);
  });
  it("delete", async () => {
    const toBeDeleted = examplaryGroups.at(-1);
    await groupTester.deleteAndAssert(delParams, getParams, toBeDeleted);
  });
});

describe("Test Student model Crud functionality.", () => {
  let studentTester = null;
  let examplaryStudents = null;
  let toBeDeleted = null;
  let getParams = "/" + examplaryTeachers[0].login;
  let delParams = null;
  it("prepare", () => {
    studentTester = new StudentRouteTester(url + "/students");
    examplaryStudents = generateExamplaryStudents();
    toBeDeleted = examplaryStudents.at(0);
    delParams = "/" + toBeDeleted.login;
    assert(
      studentTester !== null &&
        examplaryStudents !== null &&
        toBeDeleted !== null &&
        delParams !== null
    );
  });
  it("create", async () => {
    for (const student of examplaryStudents) {
      await studentTester.postAndAssert(student);
    }
  });
  it("read", async () => {
    await studentTester.getAndAssert(getParams, examplaryStudents);
  });
  it("delete", async () => {
    await studentTester.deleteAndAssert(delParams, getParams, toBeDeleted);
  });
});
