const RouteTester = require("./RouteTester");
const { dataSets, testNamePrefix } = require("../db/dbData");
const assert = require("assert");
const Group = require("../models/groupModel");

let tester = new RouteTester();

describe("Test User model basic Crud functionality.", () => {
  let users = null;
  let toBeDeleted = null;
  let toBeUpdated = null;
  it("prepare", () => {
    users = dataSets.get("teachers").set;
    users = users.concat(dataSets.get("students").set);
    toBeDeleted = users.at(1);
    toBeUpdated = users.at(0);
    tester.setRouteUrl("/users");
    for (const toBeChecked of [users, toBeDeleted, toBeUpdated]) {
      assert(toBeChecked !== null);
    }
  });
  it("add users", async () => {
    for (const user of users) {
      user.name = testNamePrefix + user.name;
      await tester.postAndAssert(user);
    }
  });
  it("remove user", async () => {
    await tester.deleteAndAssert("/" + toBeDeleted.email);
  });
  it("update user surname", async () => {
    await tester.putAndAssert({
      login: toBeUpdated.email,
      valueName: "surname",
      value: toBeUpdated.name + "updated",
    });
  });
});

describe("Test Group model Crud functionality.", () => {
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
      group.name = testNamePrefix + group.name;
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

describe("Test User model specialized Crud functionality.", function () {
  this.timeout(5000);
  let students = null;
  let group = null;
  let teacher = null;
  it("prepare", () => {
    students = dataSets.get("students").set;
    group = dataSets.get("groups").set.at(0);
    teacher = dataSets.get("teachers").set.at(0);
    for (const toBeChecked of [students, group, teacher]) {
      assert(toBeChecked !== null);
    }
  });
  it("add students to groups", async () => {
    tester.setRouteUrl("/users/addToGroup");
    const savedGroup = await Group.findOne({
      name: group.name + "updated",
    });
    for (const student of students) {
      await tester.putAndAssert({
        email: student.email,
        code: savedGroup.code,
      });
    }
  });
  it("get students of teacher", async () => {
    tester.setRouteUrl("/users");
    await tester.getAndAssert("/" + teacher.email);
  });
});
