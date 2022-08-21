const RouteTester = require("./RouteTester");
const defServerUrl = require("../../config/globalVariables").defaultServerUrl;
const assert = require("assert");

describe("Test Task model requests functionality.", () => {
  let tester = null;
  it("prepare tester", () => {
    tester = new RouteTester(defServerUrl + "/tasks");
    assert(tester !== null);
  });
  it("request to get all tasks", async () => {
    await tester.getAndAssert("");
  });
});
