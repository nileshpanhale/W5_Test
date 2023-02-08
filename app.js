const Hapi = require("@hapi/hapi");
const Good = require("good");
const db = require('./db');
const Jwt = require("@hapi/jwt");
const routes = require("./routes/routes");

const init = async () => {
  const server = Hapi.server({
    port: 4000,
    host: "localhost",
  });
  server.register({
    plugin: require("@hapi/cookie"),
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: 'access_token',
      password: process.env.MY_SECRET,
      isSecure: true,
      ttl: 30 * 60
    }
  });
  server.route(routes);
  await server.decorate("request", "database", db);

  server.start();
}
init()

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
