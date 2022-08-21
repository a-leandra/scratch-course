const testNamePrefix = "test";

const examplaryTeachers = [
  {
    login: "kafka",
    password: "Kif389^",
    telephoneNumber: "605-567-482",
    name: testNamePrefix + "Marek",
    surname: "Kafka",
  },
  {
    login: "laural",
    password: "9@ural38",
    telephoneNumber: "578937495",
    name: testNamePrefix + "Laura",
    surname: "Stupińska",
  },
  {
    login: "kijek",
    password: "9@ural28",
    telephoneNumber: "578937805",
    name: testNamePrefix + "Irena",
    surname: "Kij",
  },
];

const examplaryGroups = [
  {
    name: testNamePrefix + "Abis",
    teacherLogin: examplaryTeachers[0].login,
  },
  {
    name: testNamePrefix + "BJunior",
    teacherLogin: examplaryTeachers[0].login,
  },
  {
    name: testNamePrefix + "Cbis",
    teacherLogin: examplaryTeachers[1].login,
  },
  {
    name: testNamePrefix + "DJunior",
    teacherLogin: examplaryTeachers[1].login,
  },
  {
    name: testNamePrefix + "Fbis",
    teacherLogin: examplaryTeachers[1].login,
  },
];

module.exports = {
  examplaryTeachers,
  examplaryGroups,
  testNamePrefix,
};
