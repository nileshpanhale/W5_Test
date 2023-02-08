
const Joi = require('joi')
const { signIn, signUp, userList, logout } = require("../controller/authController");

const routes = [
  {
    method: "POST", // Method of the route
    path: "/signin", // Path of the route
    handler: signIn, // Handler aka controller of the route
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().trim().required(),
          password: Joi.string().trim().required(),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/signup", // Path of the route
    handler: signUp,
  },
  {
    method: "GET",
    path: "/userlist", // Path of the route
    options: {
      auth: {
        mode: "try",
        strategy: 'session'
      }
    },
    handler: userList,
  },
  {
    method: "GET",
    path: "/logout",
    options: {
      auth: "session",
    },
    handler: logout
  },

];
module.exports = routes