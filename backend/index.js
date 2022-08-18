const Server = require("./server.js").Server;
const { databaseUri } = require("./config/globalVariables");

const server = new Server(databaseUri.development);
const startServer = async () => {
  await server.prepareServer();
  server.run();
  console.log("Server is running: " + server.getServerUrl() + ".");
};
startServer();
