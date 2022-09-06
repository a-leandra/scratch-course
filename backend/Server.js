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
    return "http://localhost:" + this.#httpServer.address().port;
  }

  async prepareServer() {
    await this.#connectWithDatabase();
    this.#mountMiddleware();
    this.#setRouting();
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

  #mountMiddleware() {
    this.#app.use(express.json());
    this.#app.use(bodyParser.json());
    this.#app.use(notFound);
    this.#app.use(errorHandler);
  }
}

module.exports = Server;
