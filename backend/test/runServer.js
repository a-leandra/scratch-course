const Server = require("../Server.js");
const { databaseUri } = require("../config/globalVariables");
const { clearDB } = require("../db/dbHelpers");
const server = new Server(databaseUri.development);

exports.mochaHooks = {
  async beforeAll() {
    await server.prepareServer();
    console.log("Server prepared. - - -");
    server.run();
    console.log("Server running: " + server.getServerUrl() + ". - - -\n");
  },
  async afterAll() {
    this.timeout(10000);
    await clearDB(true);
    console.log("All test documents dropped. - - -");
    server.stop();
    console.log("Server stopped. - - -");
  },
};

/*
  afterAll()
  will take long to drop when a lot of data is in database to go throught,
  since it looks for test examples.
  Maybe use it only with separate claster?
*/
