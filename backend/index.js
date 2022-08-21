const Server = require("./server.js");
const { databaseUri } = require("./config/globalVariables");
//const populateDBWithSampleSets =
//  require("./db/dbHelpers").populateDBWithSampleSets;
const server = new Server(databaseUri.development);
const startServer = async () => {
  await server.prepareServer();
  server.run();
  console.log("Server is running: " + server.getServerUrl() + ".");
  //await populateDBWithSampleSets();
};
startServer();
