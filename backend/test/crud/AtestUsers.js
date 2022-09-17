const userTeachCrude = require("../../controllers/crud/userTeachCrud");
const { dataSets, testNameSuffix } = require("../../db/dbData");
const User = require("../../models/userModel");
const assert = require("assert");

/*
  In future, it would be best to have one claster only for tests.
  This would simplfy testing, e.g. no need to check for group code.
*/

const teachers = dataSets.get("teachers").set;
const students = dataSets.get("students").set;
const users = teachers.concat(students);
const suffix = testNameSuffix;

describe("CRUD test users", () => {
  it("add users", async () => {
    await addAllUsers();
    assert(users.length === (await getNumberOfTestUsers()));
  });
  it("remove last, unused teacher", async () => {
    await userTeachCrude.tryToRemoveUser(teachers.at(-1).email);
    const noResult = await User.findOne({ email: teachers.at(-1).email });
    assert(noResult === null);
  });
  it("update surname of the first teacher", async () => {
    const newSurname = "updated";
    await userTeachCrude.tryToUpdateUsersVar(teachers.at(0).email, {
      surname: newSurname,
    });
    const updatedTeacher = await User.findOne({ email: teachers.at(0).email });
    assert(updatedTeacher.surname === newSurname);
  });
});

const addAllUsers = async () => {
  for (const user of users) {
    user.name += suffix;
    user.email += suffix;
    await userTeachCrude.tryToAddUser(user);
  }
};

const getNumberOfTestUsers = async () => {
  return await User.count({
    name: {
      $regex: suffix,
      $options: "i",
    },
  });
};
