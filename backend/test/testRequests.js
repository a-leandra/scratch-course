const RouteTester = require("./RouteTester");
const { dataSets, testNameSuffix } = require("../db/dbData");
const assert = require("assert");
const Group = require("../models/groupModel");
const User = require("../models/userModel");
let tester = new RouteTester();
let generateToken = require("../utils/generateToken");

describe("Add teachers.", () => {
  let teachers = null;
  let toBeDeleted = null;
  let toBeAuthAndUpd = null;
  it("prepare", () => {
    teachers = dataSets.get("teachers").set;
    toBeDeleted = teachers.at(1);
    toBeAuthAndUpd = teachers.at(0);
    tester.setRouteUrl("/users");
    for (const toBeChecked of [teachers, toBeDeleted, toBeAuthAndUpd]) {
      assert(toBeChecked !== null);
    }
  });
  it("add teachers", async () => {
    for (const teacher of teachers) {
      teacher.name = teacher.name + testNameSuffix;
      await tester.postAndAssert(teacher);
    }
  });
  it("authenticate teacher", async () => {
    tester.setRouteUrl("/users/login");
    const loginData = {
      email: toBeAuthAndUpd.email,
      password: toBeAuthAndUpd.password,
    };
    await tester.postAndAssert(loginData);
  });
  it("update teachers data", async () => {
    tester.setRouteUrl("/users/profil");
    const teacher = await User.findOne({ email: toBeAuthAndUpd.email });
    const token = generateToken(teacher._id);
    await tester.postAuthAssert(token, teacher);
  });
  it("delete teacher", async () => {
    tester.setRouteUrl("/users");
    await tester.deleteAndAssert("/" + toBeDeleted.email);
  });
});

describe("Test Group model Requests functionality.", () => {
  let groups = null;
  let toBeDeleted = null;
  let toBeUpdated = null;
  let teacher = null;
  it("prepare", () => {
    groups = dataSets.get("groups").set;
    toBeDeleted = groups.at(-1);
    toBeUpdated = groups.at(0);
    const teachers = dataSets.get("teachers").set;
    teacher = teachers.at(0);
    tester.setRouteUrl("/groups");
    for (const toBeChecked of [groups, toBeDeleted, toBeUpdated, teacher]) {
      assert(toBeChecked !== null);
    }
  });
  it("add groups", async () => {
    for (const group of groups) {
      group.name = group.name + testNameSuffix;
      await tester.postAndAssert(group);
    }
  });
  it("remove group", async () => {
    const group = await Group.findOne({ name: toBeDeleted.name });
    await tester.deleteAndAssert("/" + group.code);
  });
  it("update group", async () => {
    const group = await Group.findOne({ name: toBeUpdated.name });
    await tester.putAndAssert({
      code: group.code,
      valueName: "name",
      value: group.name + "updated",
    });
  });
  it("get groups of teacher", async () => {
    await tester.getAndAssert("/" + groups.at(0).email);
  });
});

describe("Test User model specialized Requests functionality.", function () {
  this.timeout(5000);
  let students = null;
  let group = null;
  let teacher = null;
  it("prepare", () => {
    tester.setRouteUrl("/users");
    students = dataSets.get("students").set;
    group = dataSets.get("groups").set.at(0);
    teacher = dataSets.get("teachers").set.at(0);
    for (const toBeChecked of [students, group, teacher]) {
      assert(toBeChecked !== null);
    }
  });
  it("add students", async () => {
    const savedGroup = await Group.findOne({
      name: group.name + "updated",
    });
    for (const student of students) {
      student.name = student.name + testNameSuffix;
      student.group = savedGroup.code;
      await tester.postAndAssert(student);
    }
  });
  it("get students of teacher", async () => {
    await tester.getAndAssert("/" + teacher.email);
  });
});
