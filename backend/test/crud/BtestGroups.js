const { dataSets, testNameSuffix } = require("../../db/dbData");
const groupCrude = require("../../controllers/crud/groupCrud");
const Group = require("../../models/groupModel");
const assert = require("assert");

const teachers = dataSets.get("teachers").set;
const groups = dataSets.get("groups").set;
const suffix = testNameSuffix;

describe("CRUD test groups", () => {
  it("add groups", async () => {
    await addAllGroups();
    assert(groups.length === (await getNumberOfTestGroups()));
  });
  it("remove unused, last group", async () => {
    const toBeRemoved = await Group.findOne({ name: groups.at(-1).name });
    await groupCrude.tryToRemoveGroup(toBeRemoved.code);
    assert(null === (await Group.findOne({ code: toBeRemoved.code })));
  });
  it("update name of the first group", async () => {
    const firstGroupCode = await updateNameOfFirstGroup();
    const updatedGroup = await Group.findOne({ code: firstGroupCode });
    assert(updatedGroup.name === groups.at(0).name);
  });
  it("change homework of the first group", async () => {
    const homeworkNr = 4;
    const firstGroupCode = await changeHomeworkOfFirstGroup(homeworkNr);
    const updatedGroup = await Group.findOne({
      code: firstGroupCode,
    }).populate("homeworkTask");
    assert(updatedGroup.homeworkTask.number === homeworkNr);
  });
  it("get groups of the first teacher", async () => {
    const foundGroups = await groupCrude.tryToFindAllGroupsOfTeacher(
      teachers.at(0).email
    );
    const foundNames = foundGroups.map((group) => group.name);
    const expectedNames = groups.map((group) => group.name).slice(0, 2);
    assert(foundNames.toString() === expectedNames.toString());
  });
});

const addAllGroups = async () => {
  for (const group of groups) {
    group.name += suffix;
    group.email += suffix;
    await groupCrude.tryToAddGroup(group.name, group.email);
  }
};

const getNumberOfTestGroups = async () => {
  return await Group.count({
    name: {
      $regex: suffix,
      $options: "i",
    },
  });
};

const updateNameOfFirstGroup = async () => {
  const toBeUpdated = await Group.findOne({ name: groups.at(0).name });
  groups.at(0).name += "updated";
  await groupCrude.tryToUpdateGroupsVar(toBeUpdated.code, {
    name: groups.at(0).name,
  });
  return toBeUpdated.code;
};

const changeHomeworkOfFirstGroup = async (homeworkNr) => {
  const toHaveHomeworkChanged = await Group.findOne({
    name: groups.at(0).name,
  });
  await groupCrude.tryToChangeHomework(toHaveHomeworkChanged.code, homeworkNr);
  return toHaveHomeworkChanged.code;
};
