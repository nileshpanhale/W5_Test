const db = require("./db");
const validateUser = async (decoded, request, h) => {
  const user = await await db("user").where("username", req.payload.username);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true };
};
