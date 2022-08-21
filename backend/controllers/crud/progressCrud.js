let Student = require("../../models/studentModel");
let Task = require("../../models/taskModel");
let Progress = require("../../models/progressModel");

const findStudentProgressFromAllTasks = async (studentLogin) => {
  const student = await Student.findOne({ login: studentLogin });
  const allTasksProgress = await Progress.find({ student: student });
  return allTasksProgress;
};

const tryToAddProgress = async (progress) => {
  const student = await Student.findOne({ login: progress.studentLogin });
  const task = await Task.findOne({ number: progress.taskNumber });
  const newProgress = Progress({
    task: task,
    student: student,
    status: progress.status,
    isHomework: progress.isHomework,
  });
  await newProgress.save();
};

const tryToRemoveProgress = async (studentLogin, taskNumber) => {
  const student = await Student.findOne({ login: studentLogin });
  const task = await Task.findOne({ number: taskNumber });
  await Progress.findOneAndDelete({ student: student, task: task });
};

const tryToUpdateProgressVar = async (progress, newValue) => {
  const student = await Student.findOne({ login: progress.studentLogin });
  const task = await Task.findOne({ number: progress.taskNumber });
  await Progress.updateOne({ student: student, task: task }, newValue);
};

module.exports = {
  findStudentProgressFromAllTasks,
  tryToAddProgress,
  tryToRemoveProgress,
  tryToUpdateProgressVar,
};
