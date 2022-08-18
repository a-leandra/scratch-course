const RouteTester = require("./RouteTester");
const assert = require("assert");
const axios = require("axios");

class TeacherRouteTester extends RouteTester {
  async getAllAndAssert(orgDataSet) {
    await axios
      .get(this._routeUrl)
      .then(function (response) {
        assert(response.status === 200);
        const savedDataSetNames = response.data.map((val) => val.name);
        const orgDataSetNames = orgDataSet.map((val) => val.name);
        assert(savedDataSetNames.toString(orgDataSetNames.toString()));
      })
      .catch(function (error) {
        console.log("Error message: '" + error.response.data.message + "'.");
      });
  }

  async deleteAndAssert(reqParam, body) {
    await axios
      .delete(this._routeUrl + reqParam)
      .then(function (response) {
        assert(response.status === 201);
      })
      .catch(function (error) {
        console.log("Error message: '" + error.response.data.message + "'.");
      });
    await axios.get(this._routeUrl).then(function (response) {
      const savedDataSetNames = response.data.map((val) => val.name);
      assert(!(body.name in savedDataSetNames));
    });
  }
}

module.exports = TeacherRouteTester;
