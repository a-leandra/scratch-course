const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exampleSchema = new Schema({
  tmp: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
});

const Example = mongoose.model("Example", exampleSchema);

module.exports = Example;
