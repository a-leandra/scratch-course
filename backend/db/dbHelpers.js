const { Group, User } = require("../models/index");
const { dataSets, testNamePrefix, exampleNamePrefix } = require("./dbData");
const url = require("../config/globalVariables").defaultServerUrl;
const axios = require("axios");
const mongoose = require("mongoose");

async function populateDB(isTest) {
  const prefix = isTest ? testNamePrefix : exampleNamePrefix;
  for (const [key, value] of dataSets) {
    for (const dataPiece of value.set) {
      dataPiece.name = prefix + dataPiece.name;
      await postRequest(url + value.url, dataPiece);
    }
    console.log("Populated " + key + ".");
  }
  await addStudentsToGroups(prefix);
}

async function addStudentsToGroups(prefix) {
  const groups = (
    await Group.find({
      name: {
        $regex: prefix,
        $options: "i",
      },
    })
  ).map((group) => group.code);
  for (const student of dataSets.get("students").set) {
    const code = groups[Math.floor(Math.random() * groups.length)];
    await putRequest(url + "/users/addToGroup", {
      email: student.email,
      code: code,
    });
  }
}

async function clearDB(isTest) {
  const prefix = isTest ? testNamePrefix : exampleNamePrefix;
  await dropModelsByName([Group, User], prefix);
}

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

const postRequest = async (url, body) => {
  await axios.post(url, body).catch(function (error) {
    console.log("Error message: '" + error + "'.");
  });
};

const putRequest = async (url, body) => {
  await axios.put(url, body).catch(function (error) {
    console.log("Error message: '" + error + "'.");
  });
};

module.exports = {
  clearDB,
  populateDB,
};
