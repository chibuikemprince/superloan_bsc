"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loan_1 = __importDefault(require("../controllers/loan"));
const misc_1 = require("../helpers/misc");
const errorReporting_1 = require("../helpers/errorReporting");
class CustomerMiddleware {
    getCreditScore(req, res, next) {
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
                loan_1.default.creditScore(req.body.BVN)
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
                    msg: "Error found in createCategory() middleware",
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
