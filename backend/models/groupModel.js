const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  //numer ->a automatycznie dodawane _id (można wymusić)
  name: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  teacher: {
    type: Schema.Types.ObjectId, // populate() ->  może się przydać
    ref: "Teacher",
    required: true,
  },
  homeworkTask: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    default: null,
  },
});

groupSchema.virtual("url").get(function () {
  return "/data/group/" + this._id;
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
