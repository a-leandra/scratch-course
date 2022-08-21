const dbTestData = require("../../db/static/dbTestData");
const sampleTasks = require("../../db/static/dbSampleData").sampleTasks;
const assert = require("assert");

const progressCrud = require("../../controllers/crud/progressCrud");
const generateProgressForNewStudentsForEachTask =
  require("../../db/dbDataGenerator").generateProgressForNewStudentsForEachTask;
const Student = require("../../models/studentModel");
describe("Test Progress model Crud functionality.", () => {
  let allProgress = [];
  let toBeDeleted = null;
  let toBeUpdated = null;
  let testStudent = null;
  it("prepare", async () => {
    testStudent = await Student.findOne({
      name: {
        $regex: dbTestData.testNamePrefix,
        $options: "i",
      },
    });
    allProgress = generateProgressForNewStudentsForEachTask([testStudent]);
    toBeDeleted = allProgress.at(-1);
    toBeUpdated = allProgress[0];
    assert(allProgress !== [] && toBeDeleted !== null && toBeUpdated !== null);
  });
  it("add all progress", async () => {
    for (const progress of allProgress) {
      await progressCrud.tryToAddProgress(progress);
    }
  });
  it("remove progress", async () => {
    await progressCrud.tryToRemoveProgress(testStudent.login, 3);
  });
  it("update progress", async () => {
    await progressCrud.tryToUpdateProgressVar(toBeUpdated, {
      isHomework: true,
    });
  });
  it("get all progress of student", async () => {
    const progress = await progressCrud.findStudentProgressFromAllTasks(
      testStudent.login
    );
    const progressIsHomework = await progress.map(
      (progress) => progress.isHomework
    );
    assert(
      progressIsHomework.length === sampleTasks.length - 1 &&
        progressIsHomework[0] === true
    );
  });
});
