const Group = require("../../models/groupModel");
let User = require("../../models/userModel");

const tryToAddUser = async (user) => {
  const newUser = User(user);
  const result = await newUser.save();
  if (newUser !== result) {
    throw Object.assign(new Error("Can't add user (" + user.email + ")."), {
      code: 409,
    });
  }
};

const tryToRemoveUser = async (email) => {
  const removed = await User.findOneAndDelete({ email: email });
  if (removed === undefined || removed == null) {
    throw Object.assign(new Error("E-mail " + email + " not found."), {
      code: 404,
    });
  }
};

const tryToUpdateUsersVar = async (email, newVariable) => {
  email = await tryToFindEmailIfHashed(email);
  const result = await User.updateOne({ email: email }, newVariable);
  if (result.acknowledged === false || result.modifiedCount === 0) {
    throw Object.assign(new Error("E-mail " + email + " not found."), {
      code: 404,
    });
  }
};

const tryToAddStudentToGroup = async (email, code) => {
  const group = await Group.findOne({ code: code });
  const result = await User.updateOne({ email: email }, { group: group });
  if (result.acknowledged === false || result.modifiedCount === 0) {
    throw Object.assign(
      new Error(
        "Can't add account (" + email + ") to group with code: " + code + "."
      ),
      {
        code: 404,
      }
    );
  }
};

const tryToFindAllStudentsOfTeacher = async (email) => {
  const teacher = await User.findOne({ email: email });
  const groups = await Group.find({ teacher: teacher });
  const results = [];
  for (const group of groups) {
    const students = await User.find({
      group: group,
    });
    for (const student of students) {
      if(student.verified) {
        results.push({
          name: student.name,
          surname: student.surname,
          progress: student.task,
          group: group.code,
          email: student.email,
        });
      }
    }
  }
  return results;
};

const tryToGetHomework = async (email) => {
  const student = await User.findOne({ email: email }).populate({
    path: "group",
    populate: { path: "homeworkTask" },
  });
  return student.group.homeworkTask.number;
};

const tryToGetLastTask = async (email) => {
  email = await tryToFindEmailIfHashed(email);
  const student = await User.findOne({ email: email });
  return student.task;
};

const bcrypt = require("bcryptjs");

const tryToFindEmailIfHashed = async(sendEmail) => {
    let user = await User.findOne({email: sendEmail});
    if(user === null) {
      let users = await User.find();
      for(var u of users) {
        let result = await bcrypt.compare(u.email, sendEmail);
        if(result) {
          return u.email;
        }
      }
  }
  return sendEmail;
}

/* 
    Currently finding students will take long to process*.
    
    Example solution:
        User (Teacher) - embedded > Groups - embedded > Users (Students) - embedded > tasks.
        Additionaly students could have reference to their group and teacher.
    
    Useful: 
        https://stackoverflow.com/questions/21413864/are-circular-object-references-possible-in-mongodb
        https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/

        Moreover I have access to paid course on Udemy
        about a.o. mongodb with example database,
        which may be useuful in case of future changes.

    *It is not a problem as long as there are not many users.
*/

module.exports = {
  tryToAddUser,
  tryToRemoveUser,
  tryToUpdateUsersVar,
  tryToFindAllStudentsOfTeacher,
  tryToAddStudentToGroup,
  tryToGetHomework,
  tryToGetLastTask,
};
