import * as dotenv from "dotenv";
dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


module.exports = {
  development: {
    client: "pg",
    connection: "postgres://pgadmin:Suraj@123@127.0.0.1:5432/testdb",
    migrations: {
      directory: "./dist/migrations",
      extension: "ts",
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



