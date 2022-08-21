const groupModel = require("../models/groupModel");
const progressModel = require("../models/progressModel");
const studentModel = require("../models/studentModel");
const teacherModel = require("../models/teacherModel");
const { sampleStudents, sampleDataSets } = require("./static/dbSampleData");
const url = require("../config/globalVariables").defaultServerUrl;
const axios = require("axios");
const generateProgressForNewStudentsForEachTask =
  require("./dbDataGenerator").generateProgressForNewStudentsForEachTask;
const mongoose = require("mongoose");

const dropAllCollectionsByNameSubstring = async (substring) => {
  await dropModelsByName([groupModel, teacherModel, studentModel], substring);
  await dropProgressIfNoStudentFound();
};

const dropModelsByName = async (models, substring) => {
  for (const model of models) {
    await mongoose.connection
      .collection(model.collection.collectionName)
      .deleteMany({
        name: {
          $regex: substring,
          $options: "i",
        },
      });
  }
};

const dropProgressIfNoStudentFound = async () => {
  const allProgress = await progressModel.find({});
  for (const progress of allProgress) {
    const student = await studentModel.findOne({ _id: progress.student._id });
    if (student == null || student === undefined) {
      await progressModel.findOneAndDelete({ _id: progress._id });
    }
  }
};

async function populateDBWithSampleSets() {
  for (const set of sampleDataSets) {
    for (const dataPiece of set.data) {
      await postRequest(url + set.url, dataPiece);
    }
  }
  const sampleProgress =
    generateProgressForNewStudentsForEachTask(sampleStudents);
  for (const progress of sampleProgress) {
    await postRequest(url + "/progress", progress);
  }
}

const postRequest = async (url, body) => {
  await axios.post(url, body).catch(function (error) {
    console.log("Error message: '" + error + "'.");
  });
};

module.exports = {
  populateDBWithSampleSets,
  dropAllCollectionsByNameSubstring,
};
