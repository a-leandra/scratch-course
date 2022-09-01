const Server = require("./server.js");
const { databaseUri } = require("./config/globalVariables");
const { clearDB, populateDB } = require("./db/dbHelpers");
const server = new Server(databaseUri.development);
const startServer = async () => {
  await server.prepareServer();
  server.run();
  console.log("Server is running: " + server.getServerUrl() + ".");
  //await populateDB(false);
};
startServer();
