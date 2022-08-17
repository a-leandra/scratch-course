const express = require("express");
const DBConnection = require("./config/dbConnection");
const { port } = require("./config/globalVariables");
const bodyParser = require("body-parser");
const allRoutes = require("./routes/allRoutes");

class Server {
  #inUseDatabaseUri;
  #app;
  #httpServer;
  _dbConnection;

  constructor(databaseUri) {
    this.#inUseDatabaseUri = databaseUri;
    this.#app = express();
  }

  run() {
    this.#httpServer = this.#app.listen(port.default || port.spare);
  }

  stop() {
    this.#httpServer.close();
    this._dbConnection.disconnect();
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
    for (const [path, route] of Object.entries(allRoutes)) {
      this.#app.use(path, route);
    }
  }

  async #connectWithDatabase() {
    this._dbConnection = new DBConnection(this.#inUseDatabaseUri);
    await this._dbConnection.connect();
  }

  #mountMiddleware() {
    this.#app.use(express.json());
    this.#app.use(bodyParser.json());
  }
}

class TestServer extends Server {
  async dropTestCollection() {
    await this._dbConnection.dropTestCollection();
  }
}

module.exports = { Server, TestServer };
