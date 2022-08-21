const Server = require("../Server.js");
const { databaseUri } = require("../config/globalVariables");
const { dropAllCollectionsByNameSubstring } = require("../db/dbHelpers");
const { testNamePrefix } = require("../db/static/dbTestData");
const server = new Server(databaseUri.development);

exports.mochaHooks = {
  async beforeAll() {
    await server.prepareServer();
    console.log("Server prepared. - - -");
    server.run();
    console.log("Server running. - - -\n");
  },
  async afterAll() {
    await dropAllCollectionsByNameSubstring(testNamePrefix);
    console.log("All test documents dropped. - - -");
    server.stop();
    console.log("Server stopped. - - -");
  },
};
