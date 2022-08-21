const RouteTester = require("./RouteTester");
const defServerUrl = require("../../config/globalVariables").defaultServerUrl;
const assert = require("assert");
const dbTestData = require("../../db/static/dbTestData");

describe("Test Group model requests functionality.", () => {
  let tester = null;
  const groups = dbTestData.examplaryGroups;
  it("prepare tester", () => {
    tester = new RouteTester(defServerUrl + "/groups");
    assert(tester !== null);
  });
  it("request to add groups", async () => {
    for (const group of groups) {
      await tester.postAndAssert(group);
    }
  });
  it("request to get groups of teacher", async () => {
    await tester.getAndAssert("/" + groups.at(1).teacherLogin);
  });
  it("request to remove group", async () => {
    const urlSuffix =
      "/" + groups.at(-1).teacherLogin + "/" + groups.at(-1).name;
    await tester.deleteAndAssert(urlSuffix);
  });
});
