//Pedro
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const server_1 = __importDefault(require("./clases/server"));
//const mongoose_1 = __importDefault(require("mongoose"));
const producto_1 = __importDefault(require("./routes/producto"));

const body_parser_1 = __importDefault(require("body-parser"));
//const express_fileupload_1 = __importDefault(require("express-fileupload"));
//const server = new server_1.default();


//Pedro
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const userRoutes = require("../routes/user");

mongoose.connect("mongodb+srv://Kaza:93LYvutqp7MR7Oat@cluster0-zoswr.mongodb.net/node-ionic?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true },).
   then(( ) => {
  console.log("Connected to db")
})
  .catch(( )=>{
    console.log("Connection failed")
  })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET,POST,PATCH,DELETE,OPTIONS");
  next();

});


app.use("/api/user",userRoutes);
app.use('/producto', producto_1.default);

module.exports = app;
