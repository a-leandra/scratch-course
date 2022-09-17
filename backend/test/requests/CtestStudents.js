const assert = require("assert");
const tester = require("./RouteTester");
const User = require("../../models/userModel");
const Group = require("../../models/groupModel");
const { message } = require("./RouteTester");
const { dataSets, testNameSuffix } = require("../../db/dbData");
const defRoute = require("../../config/globalVariables").defaultServerUrl;

const suffix = testNameSuffix;
const groups = dataSets.get("groups").set;
const students = dataSets.get("students").set;
const teachers = dataSets.get("teachers").set;

describe("student's requests", function () {
  this.timeout(5000);
  const basicRoute = defRoute + "/users";
  it("add students", async () => {
    const group = await Group.findOne({
      name: groups.at(0).name,
    });
    for (const student of students) {
      const res = await addStudent({
        route: basicRoute,
        student: student,
        group: group.code,
      });
      assert(res.status === 201);
      assert((await User.findOne({ email: student.email })) !== null);
    }
  });
  it("get students of the first teacher", async () => {
    const res = await tester.get(
      message(basicRoute + "/" + teachers.at(0).email, null)
    );
    assert(res.status === 200);
    assertStudentsMatch(res);
  });
});

const addStudent = async (data) => {
  data.student.name += suffix;
  data.student.email += suffix;
  data.student.group = data.group;
  return await tester.post(message(data.route, data.student));
};

const assertStudentsMatch = (response) => {
  const found = response.data.map((student) => student.name);
  const expected = students.map((student) => student.name);
  assert(found.toString() === expected.toString());
};
