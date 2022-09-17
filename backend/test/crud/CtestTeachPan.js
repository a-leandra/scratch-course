const userTeachCrude = require("../../controllers/crud/userTeachCrud");
const { dataSets } = require("../../db/dbData");
const Group = require("../../models/groupModel");
const User = require("../../models/userModel");
const assert = require("assert");

const teachers = dataSets.get("teachers").set;
const students = dataSets.get("students").set;
const groups = dataSets.get("groups").set;

describe("functionality of teacher's panel", function () {
  this.timeout(5000); // Neccessery if no separate claster is used or/and changes in model are done.
  it("add students to first group", async () => {
    const savedGroup = await Group.findOne({
      name: groups.at(0).name,
    });
    await addStudentsToFirstGroup(savedGroup.code);
    await assertAllStudentsInFirstGroup(savedGroup.code);
  });
  it("get students of the first teacher", async () => {
    const foundNames = (
      await userTeachCrude.tryToFindAllStudentsOfTeacher(teachers.at(0).email)
    ).map((student) => student.name);
    const expectedNames = students.map((student) => student.name);
    assert(foundNames.toString() === expectedNames.toString());
  });
});

const addStudentsToFirstGroup = async (code) => {
  for (const student of students) {
    await userTeachCrude.tryToAddStudentToGroup(student.email, code);
  }
};

const assertAllStudentsInFirstGroup = async (code) => {
  for (const student of students) {
    const currentStudent = await User.findOne({
      email: student.email,
    }).populate("group");
    assert(currentStudent.group.code === code);
  }
};
