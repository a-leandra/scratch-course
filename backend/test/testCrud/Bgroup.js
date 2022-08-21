const dbTestData = require("../../db/static/dbTestData");
const assert = require("assert");

const groupCrud = require("../../controllers/crud/groupCrud");
describe("Test Group model Crud functionality.", () => {
  const groups = dbTestData.examplaryGroups;
  const toBeDeleted = groups.at(-1);
  const teacher = dbTestData.examplaryTeachers[0];
  it("add groups", async () => {
    for (const group of groups) {
      await groupCrud.tryToAddGroup(group.name, group.teacherLogin);
    }
  });
  it("remove group", async () => {
    await groupCrud.tryToRemoveGroup(
      toBeDeleted.name,
      toBeDeleted.teacherLogin
    );
  });
  it("get groups of teacher", async () => {
    const teacherGroups = await groupCrud.tryToFindAllGroupsOfTeacher(
      teacher.login
    );
    const groupsNames = teacherGroups.map((group) => group.name);
    assert(
      groupsNames.toString() === [groups[0].name, groups[1].name].toString()
    );
  });
});
