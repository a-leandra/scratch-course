const groupPrefix = require("../routes/groupRoutes").groupPrefix;
const userPrefix = require("../routes/userRoutes").userPrefix;

const testNamePrefix = "testCrud";
const exampleNamePrefix = "example";

const teachers = [
  {
    name: "Dominika",
    surname: "Wojska",
    email: "wojska@gmail.com",
    password: "nfged22*2",
    isTeacher: true,
  },
  {
    name: "Marek",
    surname: "Kora",
    email: "kornik@gmail.com",
    password: "@4Ynfged22*2",
    isTeacher: true,
  },
];

const groups = [
  {
    name: "A",
    email: "wojska@gmail.com",
  },
  {
    name: "B",
    email: "wojska@gmail.com",
  },
  {
    name: "C",
    email: "wojska@gmail.com",
  },
];

const students = [
  {
    name: "Alicja",
    surname: "Czerwińska",
    email: "ala@gmail.com",
    password: "nguwHf&2",
  },
  {
    name: "Błażej",
    surname: "Torba",
    email: "torba@wp.pl",
    password: "P!aRs89",
  },
  {
    name: "Magda",
    surname: "Dobrobylska",
    email: "madzia@onet.pl",
    password: "v1&S$400Eibo",
  },
  {
    name: "Damian",
    surname: "Pisklak",
    email: "pisklak@gmail.com",
    password: "!xS3w7j#Ssn1HdD#2Ux7*15n!T70b",
  },
  {
    name: "Sara",
    surname: "Gądek",
    email: "gadek@gmail.com",
    password: "3Rbo9$",
  },
  {
    name: "Olek",
    surname: "Tez",
    email: "tezolek@gmail.com",
    password: "kpe5H2yU0@B*",
  },
  {
    name: "Kasia",
    surname: "Wysoka",
    email: "wysoka@gmail.com",
    password: "aJ@EqM^l1Q4X",
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
  testNamePrefix,
  exampleNamePrefix,
};
