const axios = require("axios");

const sampleTeachers = [
  {
    login: "marekKafka",
    password: "Kif389^",
    telephoneNumber: "605567482",
    name: "Marek",
    surname: "Kafka",
  },
];

const sampleGroups = [
  {
    name: "Abis",
    teacherLogin: sampleTeachers[0].login,
  },
  {
    name: "BJunior",
    teacherLogin: sampleTeachers[0].login,
  },
];

const sampleStudents = [
  {
    login: "czerw",
    password: "oas894*",
    name: "Alicja",
    surname: "Czerwińska",
    groupName: sampleGroups[0].name,
  },
  {
    login: "majówka",
    password: "okkas894*",
    name: "Adam",
    surname: "Maj",
    groupName: sampleGroups[0].name,
  },
  {
    login: "kaszmir",
    password: "oas894*",
    name: "Błażej",
    surname: "Karczewski",
    groupName: sampleGroups[1].name,
  },
  {
    login: "pomidor",
    password: "09^qqE",
    name: "Patrycja",
    surname: "Olsińska",
    groupName: sampleGroups[1].name,
  },
  {
    login: "kaczka",
    password: "kaskader)9w",
    name: "Piotr",
    surname: "Paczka",
    groupName: sampleGroups[1].name,
  },
  {
    login: "kaskaderka",
    password: "T3^rIK",
    name: "Maja",
    surname: "Torba",
    groupName: sampleGroups[1].name,
  },
];

const url =
  require("../config/globalVariables").defaultServerUrl + "/panel-nauczyciela";

function populateDB() {
  sampleTeachers.forEach(async (teacher) => {
    await postRequest(url + "/teachers", teacher);
  });
  sampleGroups.forEach((group) => {
    postRequest(url + "/groups", group);
  });
  sampleStudents.forEach((student) => {
    postRequest(url + "/students", student);
  });
}

const postRequest = async (url, body) => {
  await axios
    .post(url, body)
    .then(function (response) {
      console.log(response.status);
    })
    .catch(function (error) {
      console.log("Error message: '" + error + "'.");
    });
};

module.exports = { populateDB };
