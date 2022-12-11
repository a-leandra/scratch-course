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

const defaultServerUrl = "https://scratchcourse-backend.onrender.com/";

const testServerUrl = "http://localhost:5000/";

const jwtSecret = "secret1234";

const nodeEnv = "development";

module.exports = { databaseUri, port, defaultServerUrl, jwtSecret, nodeEnv, testServerUrl };
