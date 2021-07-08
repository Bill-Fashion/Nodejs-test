const userRouter = require("./user-route");
const passport = require("passport");


function routes(app) {
  
  // app.use(passport.session());
  app.get("/", (req, res) => res.send("Home Page"));
  
  app.use("/userForm", userRouter);
}

module.exports = routes;
