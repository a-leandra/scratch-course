const RouteTester = require("./RouteTester");
const defServerUrl = require("../../config/globalVariables").defaultServerUrl;
const assert = require("assert");
const dbTestData = require("../../db/static/dbTestData");

describe("Test Teacher model requests functionality.", () => {
  let tester = null;
  const teachers = dbTestData.examplaryTeachers;
  it("prepare tester", async () => {
    tester = new RouteTester(defServerUrl + "/teachers");
    assert(tester !== null);
  });
  it("request to add teachers", async () => {
    for (const teacher of teachers) {
      await tester.postAndAssert(teacher);
    }
  });
  it("request to update teacher surname", async () => {
    await tester.putAndAssert({
      login: teachers.at(-1).login,
      valueName: "surname",
      value: "updated",
    });
  });
  it("request to get teachers", async () => {
    await tester.getAndAssert("");
  });
  it("request to remove teacher", async () => {
    await tester.deleteAndAssert("/" + teachers.at(-1).login);
  });
});
