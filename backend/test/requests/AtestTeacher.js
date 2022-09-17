const assert = require("assert");
const tester = require("./RouteTester");
const User = require("../../models/userModel");
const { message } = require("./RouteTester");
let generateToken = require("../../utils/generateToken");
const { dataSets, testNameSuffix } = require("../../db/dbData");
const defRoute = require("../../config/globalVariables").defaultServerUrl;

const teachers = dataSets.get("teachers").set;
const suffix = testNameSuffix;

describe("teacher's requests", () => {
  const basicRoute = defRoute + "/users";
  it("add teachers", async () => {
    for (const teacher of teachers) {
      const res = await requestAddTeacher(basicRoute, teacher);
      assert(res.status === 201);
      assert((await User.findOne({ email: teacher.email })) !== null);
    }
  });
  it("login the first teacher", async () => {
    const res = await tester.post(
      message(basicRoute + "/login", {
        email: teachers.at(0).email,
        password: teachers.at(0).password,
      })
    );
    assert(res.status === 201);
    const firstTeacher = await User.findOne({ email: teachers.at(0).email });
    assert(res.data.token === generateToken(firstTeacher._id));
  });
  it("update the first profile", async () => {
    const res = await changeFirstProfile(basicRoute);
    assert(res.status === 201);
    const updated = await User.findOne({ email: teachers.at(0).email });
    assert(updated.surname === teachers.at(0).surname);
  });
  it("delete last, unused teacher", async () => {
    const res = await tester.deleteReq(
      message(basicRoute + "/" + teachers.at(-1).email, null)
    );
    assert(res.status === 200);
    const notFound = await User.findOne({ email: teachers.at(-1).email });
    assert(notFound === null);
  });
});

const requestAddTeacher = async (basicRoute, teacher) => {
  teacher.name += suffix;
  teacher.email += suffix;
  return await tester.post(message(basicRoute, teacher));
};

const changeFirstProfile = async (basicRoute) => {
  const teacher = await User.findOne({ email: teachers.at(0).email });
  teacher.surname += suffix;
  teachers.at(0).surname += suffix;
  return await tester.postWithAuthorization(
    message(basicRoute + "/profil", teacher),
    generateToken(teacher._id)
  );
};
