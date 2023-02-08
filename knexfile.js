// Update with your config settings.
require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./dist/migrations",
    },
    seeds: { directory: "./dist/seeds" },
  },

  testing: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./dist/migrations",
    },
    seeds: { directory: "./dist/seeds" },
  },

  production: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./dist/migrations",
    },
    seeds: { directory: "./dist/seeds" },
  },
};