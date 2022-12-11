const assert = require("assert");
const tester = require("./RouteTester");
const User = require("../../models/userModel");
const userVerificationModel = require("../../models/userVerificationModel");
const passwordResetModel = require("../../models/passwordResetModel");
const { message } = require("./RouteTester");
let generateToken = require("../../utils/generateToken");
const { dataSets, testNameSuffix } = require("../../db/dbData");
const defRoute = require("../../config/globalVariables").testServerUrl;

const teachers = dataSets.get("teachers").set;
const suffix = testNameSuffix;

describe("teacher's requests", () => {
  const basicRoute = defRoute + "api/users";
  it("add teachers", async () => {
    for (const teacher of teachers) {
      const res = await requestAddTeacher(basicRoute, teacher);
      assert(res.status === 202);
      assert((await User.findOne({ email: teacher.email })) !== null);
    }
  });
  it("verify teachers", async() => {
    for (const teacher of teachers) {
      var tInstance = await User.findOne({ email: teacher.email });
      var verInstance = await userVerificationModel.findOne({userId: tInstance._id});
      const res = await tester.postWithCorrectHeader(defRoute + "api/users/activateAccount", {  userId: tInstance._id, uniqueString: verInstance.uniqueString});
      assert(res.status === 201);
      assert((await User.findOne({ email: teacher.email })).verified);
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
  it("reset first user password", async() => { // Ignore: "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client".
    await tester.postWithCorrectHeader(defRoute + "api/users/requestPasswordReset", 
    { email: teachers.at(-1).email, redirectUrl: "def" });
    var user = await User.findOne({email: teachers.at(-1).email});
    var token = await passwordResetModel.findOne({userId: user._id});
    const resetResponse = await tester.postWithCorrectHeader(defRoute + "api/users/resetPassword", {userId: user._id, resetString: token.resetString, newPassword: "haslo"});
    assert(resetResponse.status === 201);
    var upUser = await User.findOne({email: teachers.at(-1).email});
    assert(upUser.password !== user.password);
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
