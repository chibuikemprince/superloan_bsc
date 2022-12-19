"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const fs = require("fs");
const path = require("path");
console.log("Loading banks");
const accounts_1 = __importDefault(require("./api/models/bank/accounts"));
const personFile = path.resolve(__dirname, "./bank.json");
// Database connection
//
mongoose.connect('mongodb+srv://chixcom:lq3NI6Y1oGkbHkyh@cluster0.spyy1.gcp.mongodb.net/?retryWrites=true&w=majority', {
    // mongoose.connect('mongodb://127.0.0.1:27017/loan', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((connection) => {
    console.log("DB Connected");
    fs.readFile(personFile, 'utf8', function (err, data) {
        //data = JSON.stringify(data)
        data = JSON.parse(data);
        console.log({ data });
        let User = accounts_1.default;
        User.insertMany(data).then(function () {
            console.log("Data inserted"); // Success
        }).catch(function (error) {
            console.log("error", error.message);
            ///console.log(error)	 // Failure
        });
    });
})
    .catch((err) => {
    // console.log(`DB Connection failed, ${err}`)
});
// User model
