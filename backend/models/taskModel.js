const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  // może się zmienić w zależności od potrzeb zapisywania poziomów
});

taskSchema.virtual("url").get(function () {
  return "/data/task/" + this._id;
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
