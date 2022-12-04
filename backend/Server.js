const express = require("express");
const DBConnection = require("./db/dbConnection");
const { port } = require("./config/globalVariables");
const bodyParser = require("body-parser");
const allRoutes = require("./routes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

class Server {
  #inUseDatabaseUri;
  #app;
  #httpServer;
  #dbConnection;

  constructor(databaseUri) {
    this.#inUseDatabaseUri = databaseUri;
    this.#app = express();
  }

  run() {
    this.#httpServer = this.#app.listen(port.default || port.spare);
  }

  stop() {
    this.#httpServer.close();
    this.#dbConnection.disconnect();
  }

  getInUseDatabaseUri() {
    return this.#inUseDatabaseUri;
  }

  getServerUrl() {
    return "https://scratchcourse-backend.onrender.com/";
  }

  async prepareServer() {
    // Don't change the order - it might stop working.
    await this.#connectWithDatabase();
    this.#mountBodyParsing();
    this.#setRouting();
    this.#setDefaultResponse();
    this.#mountErrorHandling();
  }

  #setDefaultResponse() {
    this.#app.get("/", (req, res) => {
      res.send("API is running... " + this.getServerUrl());
    });
  }

  #setRouting() {
    for (const route of allRoutes) {
      this.#app.use("", route.router);
    }
  }

  async #connectWithDatabase() {
    this.#dbConnection = new DBConnection(this.#inUseDatabaseUri);
    await this.#dbConnection.connect();
  }

  #mountBodyParsing() {
    this.#app.use(express.json());
    this.#app.use(bodyParser.json());
  }

  #mountErrorHandling() {
    this.#app.use(notFound);
    this.#app.use(errorHandler);
  }
}

module.exports = Server;
