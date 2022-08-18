const RouteTester = require("./RouteTester");
const assert = require("assert");
const axios = require("axios");

class StudentRouteTester extends RouteTester {
  async getAndAssert(reqParam, orgDataSet) {
    await axios
      .get(this._routeUrl + reqParam)
      .then(function (response) {
        assert(response.status === 200);
        const savedDataSetNames = response.data.map((val) => val.name);
        const orgDataSetNames = orgDataSet.map((val) => val.name);
        assert(
          orgDataSetNames.toString().includes(savedDataSetNames.toString())
        );
      })
      .catch(function (error) {
        console.log("Error message: '" + error.response.data.message + "'.");
      });
  }

  async deleteAndAssert(reqParamDel, reqParamGet, body) {
    await axios
      .delete(this._routeUrl + reqParamDel)
      .then(function (response) {
        assert(response.status === 201);
      })
      .catch(function (error) {
        console.log("Error message: '" + error.response.data.message + "'.");
      });
    await axios.get(this._routeUrl + reqParamGet).then(function (response) {
      const savedDataSetNames = response.data.map((val) => val.name);
      assert(!(body.name in savedDataSetNames));
    });
  }
}

module.exports = StudentRouteTester;
