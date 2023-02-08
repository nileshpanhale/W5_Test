const knex = require("knex");

const knexfile = require("./knexfile");

const env = process.env.ENV || "development";

const configOptions = knexfile[env];

module.exports = knex(configOptions);
