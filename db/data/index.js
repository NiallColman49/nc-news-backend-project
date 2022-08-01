const developmentData = require("./development-data");
const testData = require("./test-data");

const ENV = process.env.NODE || "development";

const data = { development: developmentData, test: testData };

module.exports = data[ENV];
