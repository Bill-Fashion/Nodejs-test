const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080;
const routes = require("./routes/index");
const passport = require('passport');
require('passport-google-oauth20');

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); 
routes(app);
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})