require("./db/db");

const express = require("express");
const app = express();
const routes = require("./api/routes");
const bodyParser = require("body-parser");

app.set("port", 3000);

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
})

app.use(bodyParser.urlencoded({extended : false}));
app.use("/api", routes);

const server = app.listen(app.get("port"), function() {
  const port = server.address().port;
  console.log("Listening to the port " + port);
})