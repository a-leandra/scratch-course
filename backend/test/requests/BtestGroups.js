const assert = require("assert");
const tester = require("./RouteTester");
const Group = require("../../models/groupModel");
const { message } = require("./RouteTester");
const { dataSets, testNameSuffix } = require("../../db/dbData");
const defRoute = require("../../config/globalVariables").testServerUrl;

const suffix = testNameSuffix;
const groups = dataSets.get("groups").set;

describe("group's requests", () => {
  const basicRoute = defRoute + "/groups";
  it("add groups", async () => {
    for (const group of groups) {
      const res = await addGroup(basicRoute, group);
      assert(res.status === 201);
      assert((await Group.findOne({ name: group.name })) !== null);
    }
  });
  it("remove last, unused group", async () => {
    const group = await Group.findOne({ name: groups.at(-1).name });
    const res = await tester.deleteReq(
      message(basicRoute + "/" + group.code, null)
    );
    assert(res.status === 200);
    assert((await Group.findOne({ name: group.name })) === null);
  });
  it("update name of the first group", async () => {
    const res = await updateFirstName(basicRoute);
    assert(res.status === 200);
    const updated = await Group.findOne({ name: groups.at(0).name });
    assert(updated !== null);
  });
  it("change homework of the first group", async () => {
    const homeworkTask = 4;
    const res = await changeFirstHomework(basicRoute, homeworkTask);
    assert(res.status === 200);
    await assertHomeworkChanged(homeworkTask);
  });
  it("get groups of teacher", async () => {
    const res = await tester.get(
      message(basicRoute + "/" + groups.at(0).email, null)
    );
    assert(res.status === 200);
    assertCorrectGroups(res);
  });
});

const updateFirstName = async (basicRoute) => {
  const group = await Group.findOne({ name: groups.at(0).name });
  groups.at(0).name += "updated";
  return tester.put(
    message(basicRoute, {
      code: group.code,
      valueName: "name",
      value: groups.at(0).name,
    })
  );
};

const changeFirstHomework = async (basicRoute, homeworkTask) => {
  const group = await Group.findOne({ name: groups.at(0).name });
  const body = {
    code: group.code,
    homework: homeworkTask,
  };
  return await tester.put(message(basicRoute + "/homework", body));
};

const assertHomeworkChanged = async (homeworkTask) => {
  const group = await Group.findOne({ name: groups.at(0).name }).populate(
    "homeworkTask"
  );
  assert(group.homeworkTask.number === homeworkTask);
};

const addGroup = async (basicRoute, group) => {
  group.name += suffix;
  group.email += suffix;
  return await tester.post(message(basicRoute, group));
};

const assertCorrectGroups = (response) => {
  const found = response.data.map((d) => d.name);
  const expected = groups.map((group) => group.name).slice(0, 2);
  assert(found.toString() === expected.toString());
};
