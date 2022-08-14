const {
  getGroups,
  addGroup,
  removeGroup,
} = require("../controllers/groups.js");
const {
  getStudents,
  addStudent,
  removeStudent,
} = require("../controllers/students.js");
const router = require("express").Router();

router.get("/:teacherId", getGroups);
router.post("/:teacherId", addGroup);
router.delete("/:teacherId/:name", removeGroup);

router.get("/:teacherId/students", getStudents);
router.post("/:teacherId/students", addStudent);
router.delete("/:teacherId/:name/:surname", removeStudent);

module.exports = router;
