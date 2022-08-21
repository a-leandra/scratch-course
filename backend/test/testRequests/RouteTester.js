const assert = require("assert");
const axios = require("axios");

class RouteTester {
  #routeUrl;
  constructor(routeUrl) {
    this.#routeUrl = routeUrl;
  }
  async postAndAssert(body) {
    await axios
      .post(this.#routeUrl, body)
      .then(function (response) {
        assert(response.status === 201);
      })
      .catch(function (error) {
        console.log({ code: error.code, message: error.message });
      });
  }
  async putAndAssert(body) {
    await axios
      .put(this.#routeUrl, body)
      .then(function (response) {
        assert(response.status === 200);
      })
      .catch(function (error) {
        console.log({ code: error.code, message: error.message });
      });
  }
  async getAndAssert(urlSuffix) {
    await axios
      .get(this.#routeUrl + urlSuffix)
      .then(function (response) {
        assert(response.status === 200);
      })
      .catch(function (error) {
        console.log({ code: error.code, message: error.message });
      });
  }
  async deleteAndAssert(urlSuffix) {
    await axios
      .delete(this.#routeUrl + urlSuffix)
      .then(function (response) {
        assert(response.status === 200);
      })
      .catch(function (error) {
        console.log({ code: error.code, message: error.message });
      });
  }
}

module.exports = RouteTester;
