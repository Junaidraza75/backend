const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var cors = require('cors')
var session = require('express-session');


const propertyRouter = require("./routes/property");


// db connection
const connectionString = `mongodb+srv://test:3242193350@cluster0.tlv5n.mongodb.net/propertywebsite?retryWrites=true&w=majority`;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) => console.log("MONGODB connected"))
  .catch((error) => console.log("error",error));

// middleware
app.use(bodyParser.json());



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

require("./config/passport")(passport);

//routes

app.use("/property",propertyRouter);


var fs = require('fs'); 


// app.use('/public',express.static(path.join(__dirname +('public'))));
// app.use(express.static('./public'))
app.use(express.static(__dirname + "/public"));
// app.get("/", function (req, res) {
//   console.log("get-----");
//   res.status(200).json({
//     msg: "fd",
//   });
// });
try {
  fs.mkdirSync(path.join(__dirname, '/public'))
} catch (err) {
  if (err.code !== 'EEXIST') throw err
}

app.use( (error, req,res,next) =>{
     console.log(error);
     const statusCode = error.statusCode || 500;
     const message = error.message;
     const data = error.data;
    res.json({
      message ,
      data
    })

});

//Connecting redis client
// const client = redis.createClient()

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App is runnning ${port}`));
