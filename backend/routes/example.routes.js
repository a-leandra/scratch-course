const router = require("express").Router();
let Example = require("../models/example.model");
let Teacher = require("../models/teacherModel");
let Group = require("../models/groupModel");
let Student = require("../models/studentModel");
let Progress = require("../models/progressModel");
let Task = require("../models/taskModel")

router.route("/").get((req, res) => {
  Example.find()
    .then((examples) => res.json(examples))
    .catch((error) => res.status(400).json("Error " + error));
});

router.route("/add").post((req, res) => {
  const tmp = req.body.tmp;
  const newExample = Example({ tmp });
  newExample
    .save()
    .then(() => res.json("New example added!"))
    .catch((error) => res.status(400).json("Error " + error));
});

//test schemas
router.get('/teacher', async (req, res) => {  
  const {login, password, telephoneNumber, name, surname} = req.body

  try{
    const teacher = await Teacher.create({login, password, telephoneNumber, name, surname})
    res.status(200).json(teacher)

  }catch (error){
    res.status(400).json({error: error.message})
  }
})


router.get('/group', async (req, res) => {  //refToteacher
  const {name, teacher} = req.body

  try{
    const group = await Group.create( {name, teacher} )
    res.status(200).json(group)

  }catch (error){
    res.status(400).json({error: error.message})
  }
})

router.get('/student', async (req, res) => {   //ref to group
  const {login, password, name, surname, group} = req.body

  try{
    const student = await Student.create({login, password, name, surname, group})
    res.status(200).json(student)

  }catch (error){
    res.status(400).json({error: error.message})
  }
})

router.get('/progress', async (req, res) => {  //ref
  const {excercise, student, status, isHomework} = req.body

  try{
    const progress = await Progress.create({excercise, student, status, isHomework})
    res.status(200).json(progress)

  }catch (error){
    res.status(400).json({error: error.message})
  }
})

router.get('/task', async (req, res) => {  
  const {number} = req.body

  try{
    const task = await Task.create({number})
    res.status(200).json(task)

  }catch (error){
    res.status(400).json({error: error.message})
  }
})

module.exports = router;
