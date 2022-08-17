const mongoose = require("mongoose");
const teachersPanelModels = require("../models/allModels").teachersPanelModels;
class DBConnection {
  #inUseDatabaseUri;
  #clasterName;
  constructor(inUseDatabaseUri) {
    this.#inUseDatabaseUri = inUseDatabaseUri;
    this.#clasterName = this.#inUseDatabaseUri.substring(
      this.#inUseDatabaseUri.indexOf("@") + 1,
      this.#inUseDatabaseUri.indexOf(".")
    );
  }
  connect = async () => {
    try {
      await mongoose.connect(this.#inUseDatabaseUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(
        "Connection with claster: " + this.#clasterName + " established."
      );
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };

  disconnect = async () => {
    try {
      await mongoose.connection.close();
      console.log("Connection with claster: " + this.#clasterName + " closed.");
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  dropTestCollection = async () => {
    for (const model of teachersPanelModels) {
      await mongoose.connection
        .collection(model.collection.collectionName)
        .deleteMany({
          name: {
            $regex: "test",
            $options: "i",
          },
        });
    }
  };
}
module.exports = DBConnection;
