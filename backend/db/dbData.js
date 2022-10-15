const groupPrefix = require("../routes/groupRoutes").groupPrefix;
const userPrefix = require("../routes/userRoutes").userPrefix;

const testNameSuffix = "testCrud";
const exampleNameSuffix = "example";
const defProfPiv =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

const teachers = [
  {
    name: "Dominika",
    surname: "Wojska",
    email: "admin@gmail.com",
    password: "pass",
    group: null,
    task: 1,
    isTeacher: true,
    picture: defProfPiv,
  },
  {
    name: "Marek",
    surname: "Kora",
    email: "kornik@gmail.com",
    password: "@4Ynfged22*2",
    group: null,
    task: 1,
    isTeacher: true,
    picture: defProfPiv,
  },
];

const groups = [
  {
    name: "A",
    email: "admin@gmail.com",
  },
  {
    name: "B",
    email: "admin@gmail.com",
  },
  {
    name: "C",
    email: "admin@gmail.com",
  },
];

const students = [
  {
    name: "Alicja",
    surname: "Czerwińska",
    email: "ala@gmail.com",
    password: "nguwHf&2",
    group: null,
    task: 1,
    isTeacher: false,
    picture: defProfPiv,
  },
  {
    name: "Błażej",
    surname: "Torba",
    email: "torba@wp.pl",
    password: "P!aRs89",
    group: null,
    task: 1,
    isTeacher: false,
    picture: defProfPiv,
  },
  {
    name: "Magda",
    surname: "Dobrobylska",
    email: "madzia@onet.pl",
    password: "v1&S$400Eibo",
    group: null,
    task: 1,
    isTeacher: false,
    picture: defProfPiv,
  },
  {
    name: "Damian",
    surname: "Pisklak",
    email: "pisklak@gmail.com",
    password: "!xS3w7j#Ssn1HdD#2Ux7*15n!T70b",
    group: null,
    task: 1,
    isTeacher: false,
    picture: defProfPiv,
  },
  {
    name: "Sara",
    surname: "Gądek",
    email: "gadek@gmail.com",
    password: "3Rbo9$",
    group: null,
    task: 1,
    isTeacher: false,
    picture: defProfPiv,
  },
  {
    name: "Olek",
    surname: "Tez",
    email: "tezolek@gmail.com",
    password: "kpe5H2yU0@B*",
    group: null,
    task: 1,
    isTeacher: false,
    picture: defProfPiv,
  },
  {
    name: "Kasia",
    surname: "Wysoka",
    email: "wysoka@gmail.com",
    password: "aJ@EqM^l1Q4X",
    group: null,
    task: 1,
    isTeacher: false,
    picture: defProfPiv,
  },
];

const dataSets = new Map([
  [
    "teachers",
    {
      set: teachers,
      url: userPrefix,
    },
  ],
  [
    "groups",
    {
      set: groups,
      url: groupPrefix,
    },
  ],
  [
    "students",
    {
      set: students,
      url: userPrefix,
    },
  ],
]);

module.exports = {
  dataSets,
  testNameSuffix,
  exampleNameSuffix,
};
