const authRoute = require("./authRoute");
const contactRoute = require("./contactRoute");

// Make sure your routes come after the session middleware

const mountRoutes = (app) => {
  app.use("/auth", authRoute);
  app.use("/contact", contactRoute);
};

module.exports = mountRoutes;
