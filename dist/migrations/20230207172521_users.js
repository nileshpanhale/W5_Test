/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.withSchema("public").createTable("user", (table) => {
     table.increments("id").primary();
     table.string("username").notNullable();
     table.string("password").notNullable();
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
