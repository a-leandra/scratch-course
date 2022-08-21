const RouteTester = require("./RouteTester");
const defServerUrl = require("../../config/globalVariables").defaultServerUrl;
const assert = require("assert");
const dbTestData = require("../../db/static/dbTestData");

const generateProgressForNewStudentsForEachTask =
  require("../../db/dbDataGenerator").generateProgressForNewStudentsForEachTask;
const Student = require("../../models/studentModel");
describe("Test Progress model requests functionality.", () => {
  let allProgress = [];
  let tester = null;
  let testStudent = null;
  it("prepare", async () => {
    tester = new RouteTester(defServerUrl + "/progress");
    testStudent = await Student.findOne({
      name: {
        $regex: dbTestData.testNamePrefix,
        $options: "i",
      },
    });
    allProgress = generateProgressForNewStudentsForEachTask([testStudent]);
    assert(allProgress !== [] && tester !== null && testStudent !== null);
  });
  it("request to add progress", async () => {
    for (const progress of allProgress) {
      await tester.postAndAssert(progress);
    }
  });
  it("request to update progress", async () => {
    await tester.putAndAssert({
      studentLogin: allProgress[0].studentLogin,
      taskNumber: allProgress[0].taskNumber,
      valueName: "isHomework",
      value: true,
    });
  });
  it("request to get progress of student", async () => {
    await tester.getAndAssert("/" + allProgress[0].studentLogin);
  });
  it("request to remove progress", async () => {
    await tester.deleteAndAssert(
      "/" + allProgress[0].studentLogin + "/" + allProgress[0].taskNumber
    );
  });
});
