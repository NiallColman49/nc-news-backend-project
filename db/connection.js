const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";

console.log(ENV);

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

module.exports = new Pool();

// {
//   description: 'The man, the Mitch, the legend',
//   slug: 'mitch'
// },
// {
//   description: 'Not dogs',
//   slug: 'cats'
// },
// {
//   description: 'what books are made of',
//   slug: 'paper'
// }
