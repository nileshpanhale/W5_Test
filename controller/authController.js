const JWT = require('jsonwebtoken')
const db = require('../db')
const signIn = async (request, h) => {
  try {
    const users = await db("user").where("username", request.payload);
    if (!users) {
      return h.response("User not found").code(400);
    }
    const token = JWT.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: request.payload,
      },
      process.env.MY_SECRET
    );

    request.cookieAuth.set(users);
    return h.response({ message: "signin successfull" }).code(200);
  } catch (error) {
    console.log(error);
    return h.response("Oops, something went wrong !").code(500);
  }
};

const signUp = async (request, h) => {
  try {
    const { username, password } = request.payload
    const ruser = await db("user").where("username", username);

    if (ruser.length < 1) {
      request.cookieAuth.set(request.payload);
      const user = await db("user").insert(request.payload);

      return h.response({ message: "signup successfull" }).code(200);

    }
    else {
      return h.response("username already exists").code(400);
    }


  } catch (error) {
    console.log(error);
    return h.response("Oops, something went wrong !").code(500);
  }
}


const userList = async (request, h) => {
  try {
    if (request.auth.isAuthenticated) {

      const users = await db("user").select("username");
      return h.response({ message: "UserList fetched successfully", data: users }).code(200);
    }
    else {
      return h.response("Oops, session timeout !").code(400)
    }


  } catch (error) {
    console.log(error);
    return h.response("Oops, something went wrong !").code(500);
  }
}
const logout = async (request, h) => {
  try {
    request.cookieAuth.clear();
    return h.response({ message: "logout successfull" }).code(
      200
    );
  } catch (error) {
    console.log(error);
    return h.response("Oops, something went wrong !").code(500);
  }
}
module.exports = { signIn, signUp, userList, logout };