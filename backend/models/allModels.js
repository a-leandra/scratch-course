const groupModel = require("../models/groupModel");
const progressModel = require("../models/progressModel");
const studentModel = require("../models/studentModel");
const taskModel = require("../models/taskModel");
const teacherModel = require("../models/teacherModel");

const allModels = [
  groupModel,
  progressModel,
  studentModel,
  taskModel,
  teacherModel,
];

const teacherGroupStudentModels = [groupModel, studentModel, teacherModel];

module.exports = { allModels, teacherGroupStudentModels };
