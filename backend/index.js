const Server = require("./Server.js");
const { databaseUri } = require("./config/globalVariables");
const server = new Server(databaseUri.development);
// const { clearDB, populateDB, isDBPopulated } = require("./db/dbHelpers");

const startServer = async () => {
  await server.prepareServer();
  server.run();
  console.log("Server is running: " + server.getServerUrl() + ".");
  /*
  await clearDB(false);
  console.log("Populating data base with examplary data...");
  await populateDB(false);
  console.log("Data base fully populated.");
  */
};

startServer();
