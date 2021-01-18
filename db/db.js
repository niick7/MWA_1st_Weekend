const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017/BooksDB";

require("../api/models/books");

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

mongoose.connection.on("connected", function(){
  console.log("Mongo connect to " + dbURL);
})
mongoose.connection.on("disconnected", function(){
  console.log("Mongo disconnected");
})
mongoose.connection.on("error", function(err){
  console.log("Mongo connection error: " + err);
})

process.on("SIGINT", function(){
  mongoose.connection.close(function(){
    console.log("Mongo disconnected by app termination");
    process.exit(0);
  })
})
process.on("SIGTERM", function(){
  mongoose.connection.close(function(){
    console.log("Mongo disconnected by app termination");
    process.exit(0);
  })
})
process.on("SIGUSR2", function(){
  mongoose.connection.close(function(){
    console.log("Mongo disconnected by app termination");
    process.kill(process.pid, "SIGUSR2");
  })
})