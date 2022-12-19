"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customers_1 = __importDefault(require("../controllers/customers"));
const misc_1 = require("../helpers/misc");
const errorReporting_1 = require("../helpers/errorReporting");
class CustomerMiddleware {
    verifyBVN(req, res, next) {
        return new Promise((resolve, reject) => {
            try {
                if (!req.body.hasOwnProperty("BVN") || !req.body.BVN.length) {
                    let feedback = {
                        message: 'BVN is required',
                        data: [],
                        status: 400,
                        statusCode: 'FORM_REQUIREMENT_ERROR',
                    };
                    (0, misc_1.response)(res, feedback);
                    return;
                }
                customers_1.default.SendBVNOtp(req.body.BVN)
                    //CategoryCrud.create(req.body.name, req.body.skills)
                    .then((done) => {
                    // console.log({done})
                    (0, misc_1.response)(res, done);
                    return;
                })
                    .catch((err) => {
                    console.log({ err });
                    (0, misc_1.response)(res, err);
                    //throw err;
                });
            }
            catch (err) {
                (0, errorReporting_1.LogError)({
                    msg: "Error found in CustomerMiddleware() middleware",
                    status: "STRONG",
                    time: new Date().toUTCString(),
                    stack: err,
                    class: this
                });
                let feedback = {
                    message: 'error found, please try again. If this persists contact support',
                    data: [],
                    status: 500,
                    statusCode: 'UNKNOWN_ERROR',
                };
                (0, misc_1.response)(res, feedback);
                return;
            }
        });
    }
    registration(req, res, next) {
        return new Promise((resolve, reject) => {
            try {
                if (!req.body.hasOwnProperty("BVN") || !req.body.BVN.length || !req.body.hasOwnProperty("otp") || !req.body.otp.length || !req.body.hasOwnProperty("password") || !req.body.password.length) {
                    let feedback = {
                        message: 'BVN, otp and password are required',
                        data: [],
                        status: 400,
                        statusCode: 'FORM_REQUIREMENT_ERROR',
                    };
                    (0, misc_1.response)(res, feedback);
                    return;
                }
                customers_1.default.register(req.body.BVN, req.body.otp, req.body.password)
                    //CategoryCrud.create(req.body.name, req.body.skills)
                    .then((done) => {
                    // console.log({done})
                    (0, misc_1.response)(res, done);
                    return;
                })
                    .catch((err) => {
                    console.log({ err });
                    (0, misc_1.response)(res, err);
                    //throw err;
                });
            }
            catch (err) {
                (0, errorReporting_1.LogError)({
                    msg: "Error found in CustomerMiddleware() middleware",
                    status: "STRONG",
                    time: new Date().toUTCString(),
                    stack: err,
                    class: this
                });
                let feedback = {
                    message: 'error found, please try again. If this persists contact support',
                    data: [],
                    status: 500,
                    statusCode: 'UNKNOWN_ERROR',
                };
                (0, misc_1.response)(res, feedback);
                return;
            }
        });
    }
    login(req, res, next) {
        return new Promise((resolve, reject) => {
            try {
                if (!req.body.hasOwnProperty("email") || !req.body.email.length || !req.body.hasOwnProperty("password") || !req.body.password.length) {
                    let feedback = {
                        message: 'Email and password are required',
                        data: [],
                        status: 400,
                        statusCode: 'FORM_REQUIREMENT_ERROR',
                    };
                    (0, misc_1.response)(res, feedback);
                    return;
                }
                customers_1.default.login(req.body.email, req.body.password)
                    //CategoryCrud.create(req.body.name, req.body.skills)
                    .then((done) => {
                    // console.log({done})
                    (0, misc_1.response)(res, done);
                    return;
                })
                    .catch((err) => {
                    console.log({ err });
                    (0, misc_1.response)(res, err);
                    //throw err;
                });
            }
            catch (err) {
                (0, errorReporting_1.LogError)({
                    msg: "Error found in CustomerMiddleware() middleware",
                    status: "STRONG",
                    time: new Date().toUTCString(),
                    stack: err,
                    class: this
                });
                let feedback = {
                    message: 'error found, please try again. If this persists contact support',
                    data: [],
                    status: 500,
                    statusCode: 'UNKNOWN_ERROR',
                };
                (0, misc_1.response)(res, feedback);
                return;
            }
        });
    }
    getAllUsers(req, res, next) {
        return new Promise((resolve, reject) => {
            try {
                customers_1.default.getAllUsers()
                    //CategoryCrud.create(req.body.name, req.body.skills)
                    .then((done) => {
                    // console.log({done})
                    (0, misc_1.response)(res, done);
                    return;
                })
                    .catch((err) => {
                    console.log({ err });
                    (0, misc_1.response)(res, err);
                    //throw err;
                });
            }
            catch (err) {
                (0, errorReporting_1.LogError)({
                    msg: "Error found in CustomerMiddleware() middleware",
                    status: "STRONG",
                    time: new Date().toUTCString(),
                    stack: err,
                    class: this
                });
                let feedback = {
                    message: 'error found, please try again. If this persists contact support',
                    data: [],
                    status: 500,
                    statusCode: 'UNKNOWN_ERROR',
                };
                (0, misc_1.response)(res, feedback);
                return;
            }
        });
    }
}
exports.default = new CustomerMiddleware();
