const { getGroups, addGroup, removeGroup } = require("../controllers/group.js");
const {
  getStudents,
  addStudent,
  removeStudent,
} = require("../controllers/student.js");
const {
  getTeachers,
  addTeacher,
  removeTeacher,
} = require("../controllers/teacher.js");
const router = require("express").Router();

router.get("/groups/:teacherLogin", getGroups);
router.post("/groups/", addGroup);
router.delete("/groups/:teacherLogin/:name", removeGroup);

router.get("/students/:teacherLogin", getStudents);
router.post("/students", addStudent);
router.delete("/students/:studentLogin", removeStudent);

router.get("/teachers", getTeachers);
router.post("/teachers", addTeacher);
router.delete("/teachers/:login", removeTeacher);

module.exports = router;
