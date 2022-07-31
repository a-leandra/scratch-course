const router = require("express").Router();
let Example = require("../models/example.model");

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

module.exports = router;
