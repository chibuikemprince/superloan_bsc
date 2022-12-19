"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = exports.decodePwd = exports.hashPassword = exports.response = void 0;
const bcrypt = require('bcryptjs');
const hashSync = bcrypt.hashSync;
const compareSync = bcrypt.compareSync;
const Randomatic = require('randomatic');
const response = (res, data) => {
    data.status =
        data.status == undefined || data.status == null ? 500 : data.status;
    res.status(data.status).json(data);
    return;
};
exports.response = response;
const hashPassword = (password) => {
    const hashedPwd = hashSync(password, 10);
    // return ; 
    return new Promise((resolve, reject) => {
        resolve(hashedPwd);
    });
};
exports.hashPassword = hashPassword;
const decodePwd = (reqPassword, dbPassword) => {
    const compare = compareSync(reqPassword, dbPassword);
    return new Promise((resolve, reject) => {
        resolve(compare);
    });
};
exports.decodePwd = decodePwd;
const generateOtp = () => {
    let alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "M", "N"];
    let index = parseInt((Math.random() * (10 - 1) + 1));
    let replaceValue = alpha[index];
    replaceValue = replaceValue ? replaceValue : "X";
    //console.log("replace: ", replaceValue)
    return new Promise((resolve, reject) => {
        resolve(Randomatic('A0', 6).replace(/[0oOi1Il]/g, replaceValue));
    });
};
exports.generateOtp = generateOtp;
