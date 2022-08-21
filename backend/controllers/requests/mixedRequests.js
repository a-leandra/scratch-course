const getStudentsOfTeacherAndTheirStat = require("../crud/mixesCrud");

const getStudentsOfTeacherAndTheirStatRequest = async (req, res) => {
  const { teacherLogin } = req.params;
  try {
    const students = await getStudentsOfTeacherAndTheirStat(teacherLogin);
    return res.status(200).json(students);
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

module.exports = getStudentsOfTeacherAndTheirStatRequest;
