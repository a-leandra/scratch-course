const sampleTasks = require("../../db/static/dbSampleData").sampleTasks;
const assert = require("assert");

let Task = require("../../models/taskModel");
describe("Test Task model Crud functionality.", () => {
  it("read tasks", async () => {
    const tasks = await Task.find({});
    assert(tasks.length === sampleTasks.length);
  });
});
