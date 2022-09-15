const { dataSets, testNameSuffix } = require("../db/dbData");
const userTeachCrude = require("../controllers/crud/userTeachCrud");
const groupCrude = require("../controllers/crud/groupCrud");
const assert = require("assert");
const Group = require("../models/groupModel");
const User = require("../models/userModel");
const { test } = require("mocha");

/*
  In future, it would be best to have one claster only for tests.
  This would simplfy testing.
*/

describe("Test UserTeach model basic Crud functionality.", () => {
  let users = null;
  let toBeDeleted = null;
  let toBeUpdated = null;
  it("prepare", () => {
    users = dataSets.get("teachers").set;
    users = users.concat(dataSets.get("students").set);
    toBeDeleted = users.at(1);
    toBeUpdated = users.at(0);
    for (const toBeChecked of [users, toBeDeleted, toBeUpdated]) {
      assert(toBeChecked !== null);
    }
  });
  it("add users", async () => {
    for (const user of users) {
      user.name = user.name + testNameSuffix;
      user.email += testNameSuffix;
      await userTeachCrude.tryToAddUser(user);
    }
  });
  it("remove user", async () => {
    await userTeachCrude.tryToRemoveUser(toBeDeleted.email);
  });
  it("update user surname", async () => {
    await userTeachCrude.tryToUpdateUsersVar(toBeUpdated.email, {
      surname: "updated",
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
    for (const toBeChecked of [groups, toBeDeleted, toBeUpdated, teacher]) {
      assert(toBeChecked !== null);
    }
  });
  it("add groups", async () => {
    for (const group of groups) {
      group.name = group.name + testNameSuffix;
      await groupCrude.tryToAddGroup(group.name, group.email + testNameSuffix);
    }
  });
  it("remove group", async () => {
    const group = await Group.findOne({ name: toBeDeleted.name });
    await groupCrude.tryToRemoveGroup(group.code);
  });
  it("update group", async () => {
    const group = await Group.findOne({ name: toBeUpdated.name });
    await groupCrude.tryToUpdateGroupsVar(group.code, {
      name: group.name + "updated",
    });
  });
  it("change homework", async () => {
    const group = await Group.findOne({ name: toBeUpdated.name + "updated" });
    await groupCrude.tryToChangeHomework(group.code, 4);
  });
  it("get groups of teacher", async () => {
    const result = await groupCrude.tryToFindAllGroupsOfTeacher(teacher.email);
    const found = result.map((instance) => instance.name);
    const expected = ["A" + testNameSuffix + "updated", "B" + testNameSuffix];
    assert(found.toString() === expected.toString());
  });
});

describe("Test UserTeach model specialized Crud functionality.", function () {
  this.timeout(5000); // Neccessery if no separate claster is used or changes in model are done.
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
    const savedGroup = await Group.findOne({
      name: group.name + "updated",
    });
    for (const student of students) {
      await userTeachCrude.tryToAddStudentToGroup(
        student.email,
        savedGroup.code
      );
    }
  });
  it("get students of teacher", async () => {
    const found = (
      await userTeachCrude.tryToFindAllStudentsOfTeacher(teacher.email)
    ).map((student) => student.name);
    const expected = students.map((student) => student.name);
    assert(found.toString() === expected.toString());
  });
});
