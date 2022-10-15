const { exampleNameSuffix } = require("../../db/dbData");
const { tryToAddGroup } = require("../crud/groupCrud");
const { tryToAddUser } = require("../crud/userTeachCrud");
const defProfPiv =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

let universalTeacher = {
  name: "0" + exampleNameSuffix,
  surname: "0",
  email: "0@gmail.com" + exampleNameSuffix,
  password: "0",
  group: null,
  task: 1,
  isTeacher: true,
  picture: defProfPiv,
};

let universalGroup = {
  name: "0" + exampleNameSuffix,
  email: "0@gmail.com" + exampleNameSuffix,
};

const tryToaddUnivTeachAndGroup = async () => {
  await tryToAddUser(universalTeacher);
  await tryToAddGroup(universalGroup.name, universalGroup.email);
};

module.exports = {
  tryToaddUnivTeachAndGroup,
};
