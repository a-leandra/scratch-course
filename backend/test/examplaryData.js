const examplaryTeachers = [
  {
    login: "kafka",
    password: "Kif389^",
    telephoneNumber: "605-567-482",
    name: "testMarek",
    surname: "Kafka",
  },
  {
    login: "laural",
    password: "9@ural38",
    telephoneNumber: "578937495",
    name: "testLaura",
    surname: "Stupińska",
  },
  {
    login: "kijek",
    password: "9@ural28",
    telephoneNumber: "578937805",
    name: "testIrena",
    surname: "Kij",
  },
];

const examplaryGroups = [
  {
    name: "testAbis",
    teacherLogin: examplaryTeachers[0].login,
  },
  {
    name: "testBJunior",
    teacherLogin: examplaryTeachers[0].login,
  },
  {
    name: "testCbis",
    teacherLogin: examplaryTeachers[1].login,
  },
  {
    name: "testDJunior",
    teacherLogin: examplaryTeachers[1].login,
  },
  {
    name: "testFbis",
    teacherLogin: examplaryTeachers[1].login,
  },
];

const generateExamplaryStudents = () => {
  const examplaryStudents = [];
  for (const group of examplaryGroups) {
    const studentsNr = generateRandomInt();
    for (var i = 0; i < studentsNr; i++) {
      examplaryStudents.push(createStudent(group));
    }
  }
  return examplaryStudents;
};

const createStudent = (group) => {
  return {
    login: generateRandomString(),
    password: generateRandomString(),
    name: "test" + generateRandomString(),
    surname: generateRandomString(),
    groupName: group.name,
  };
};

const generateRandomInt = (max = 4) => {
  return Math.floor(Math.random() * max);
};

const generateRandomString = (length = 10) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = {
  examplaryTeachers,
  examplaryGroups,
  generateExamplaryStudents,
};
