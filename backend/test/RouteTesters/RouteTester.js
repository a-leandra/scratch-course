const assert = require("assert");
const axios = require("axios");

class RouteTester {
  _routeUrl;
  constructor(routeUrl) {
    this._routeUrl = routeUrl;
  }
  async postAndAssert(body) {
    await axios
      .post(this._routeUrl, body)
      .then(function (response) {
        assert(response.status === 201);
      })
      .catch(function (error) {
        console.log("Error message: '" + error.response.data.message + "'.");
      });
  }
}

module.exports = RouteTester;
