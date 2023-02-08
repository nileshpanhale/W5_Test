/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
 
  await knex('todo').insert([
   
        {id: 1, username: 'suraj' ,password:"123"},
        {id: 2, username: 'user2' ,password:"123"},
        {id: 3, username: 'user3',password:"12123"}
      
  ]);
};
