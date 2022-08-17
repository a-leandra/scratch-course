const Server = require("./server.js").Server;
const { databaseUri } = require("./config/globalVariables");

const server = new Server(databaseUri.development);
server.prepareServer();
server.run();

console.log("Server is running: " + server.getServerUrl() + ".");

//server.stop();
