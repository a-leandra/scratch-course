const TestServer = require("../Server.js").TestServer;
const { databaseUri } = require("../config/globalVariables");
const server = new TestServer(databaseUri.development);

exports.mochaHooks = {
  async beforeAll() {
    await server.prepareServer();
    server.run();
    console.log("Server running. - - -\n");
  },
  async afterAll() {
    await server.dropTestCollection();
    server.stop();
    console.log("Server stopped. - - -");
  },
};
