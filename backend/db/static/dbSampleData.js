const sampleNamePrefix = "Sample";

const sampleTeachers = [
  {
    login: "marekKafka",
    password: "Kif389^",
    telephoneNumber: "605567482",
    name: "Marek" + sampleNamePrefix,
    surname: "Kafka",
  },
];

const sampleGroups = [
  {
    name: "A" + sampleNamePrefix,
    teacherLogin: sampleTeachers[0].login,
  },
  {
    name: "B" + sampleNamePrefix,
    teacherLogin: sampleTeachers[0].login,
  },
];

const sampleStudents = [
  {
    login: "czerw",
    password: "oas894*",
    name: "Alicja" + sampleNamePrefix,
    surname: "Czerwińska",
    groupName: sampleGroups[0].name,
  },
  {
    login: "majówka",
    password: "okkas894*",
    name: "Adam" + sampleNamePrefix,
    surname: "Maj",
    groupName: sampleGroups[0].name,
  },
  {
    login: "kaszmir",
    password: "oas894*",
    name: "Błażej" + sampleNamePrefix,
    surname: "Karczewski",
    groupName: sampleGroups[1].name,
  },
  {
    login: "pomidor",
    password: "09^qqE",
    name: "Patrycja" + sampleNamePrefix,
    surname: "Olsińska",
    groupName: sampleGroups[1].name,
  },
  {
    login: "kaczka",
    password: "kaskader)9w",
    name: "Piotr" + sampleNamePrefix,
    surname: "Paczka",
    groupName: sampleGroups[1].name,
  },
  {
    login: "kaskaderka",
    password: "T3^rIK",
    name: "Maja" + sampleNamePrefix,
    surname: "Torba",
    groupName: sampleGroups[1].name,
  },
];

const sampleTasks = [
  { number: 1 },
  { number: 2 },
  { number: 3 },
  { number: 4 },
  { number: 5 },
  { number: 6 },
  { number: 7 },
  { number: 8 },
  { number: 9 },
  { number: 10 },
];

const sampleDataSets = [
  {
    data: sampleTeachers,
    url: "/teachers",
  },
  {
    data: sampleGroups,
    url: "/groups",
  },
  {
    data: sampleStudents,
    url: "/students",
  },
  {
    data: sampleTasks,
    url: "/tasks",
  },
];

module.exports = {
  sampleTasks,
  sampleStudents,
  sampleDataSets,
  sampleNamePrefix,
};
