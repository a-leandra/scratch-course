const databaseUri = {
  development:
    "mongodb+srv://Admin:EWhmZIs9LXhAMwdX@scratch-cluster.cgcgp.mongodb.net/?retryWrites=true&w=majority",
  production:
    "mongodb+srv://Admin:EWhmZIs9LXhAMwdX@scratch-house.cgcgp.mongodb.net/?retryWrites=true&w=majority",
};

const port = {
  default: 5000,
  spare: 9000,
};

const defaultServerUrl = "http://localhost:" + port.default;

const jwtSecret = "secret1234";

const nodeEnv = "development";

module.exports = { databaseUri, port, defaultServerUrl, jwtSecret, nodeEnv };
