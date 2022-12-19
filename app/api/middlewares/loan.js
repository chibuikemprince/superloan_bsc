"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loan_1 = __importDefault(require("../controllers/loan"));
const misc_1 = require("../helpers/misc");
const errorReporting_1 = require("../helpers/errorReporting");
class LoanMiddleware {
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
                    msg: "Error found in LoanMiddleware() middleware",
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
    applyForLoan(req, res, next) {
        return new Promise((resolve, reject) => {
            try {
                let { amount, account_number, duration, reason, BVN } = req.body;
                let required = { amount, account_number, duration, reason, BVN };
                for (var a in required) {
                    if (!required[a]) {
                        let feedback = {
                            message: 'amount, account_number, duration, reason , and BVN are required.',
                            data: [],
                            status: 400,
                            statusCode: 'FORM_REQUIREMENT_ERROR',
                        };
                        (0, misc_1.response)(res, feedback);
                        return;
                    }
                }
                loan_1.default.applyForLoan(amount, account_number, duration, reason, BVN)
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
                    msg: "Error found in LoanMiddleware() middleware",
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
    payLoan(req, res, next) {
        return new Promise((resolve, reject) => {
            try {
                /*
                
                loanId: string, amount: number, account_number: string, BVN: string
                */
                let { loanId, amount, account_number, BVN } = req.body;
                let required = { loanId, amount, account_number, BVN };
                for (var a in required) {
                    if (!required[a]) {
                        let feedback = {
                            message: 'loanId, amount, account_number, and BVN are required.',
                            data: [],
                            status: 400,
                            statusCode: 'FORM_REQUIREMENT_ERROR',
                        };
                        (0, misc_1.response)(res, feedback);
                        return;
                    }
                }
                loan_1.default.payLoan(loanId, amount, account_number, BVN)
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
                    msg: "Error found in LoanMiddleware() middleware",
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
    userBankAccounts(req, res, next) {
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
                loan_1.default.userBankAccounts(req.body.BVN)
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
                    msg: "Error found in LoanMiddleware() middleware",
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
    loanRecord(req, res, next) {
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
                loan_1.default.loanRecord(req.body.BVN)
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
                    msg: "Error found in LoanMiddleware() middleware",
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
    loanRepayment(req, res, next) {
        return new Promise((resolve, reject) => {
            try {
                if (!req.body.hasOwnProperty("loanId") || !req.body.loanId.length) {
                    let feedback = {
                        message: 'loanId is required',
                        data: [],
                        status: 400,
                        statusCode: 'FORM_REQUIREMENT_ERROR',
                    };
                    (0, misc_1.response)(res, feedback);
                    return;
                }
                loan_1.default.loanRepayment(req.body.loanId)
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
                    msg: "Error found in LoanMiddleware() middleware",
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
exports.default = new LoanMiddleware();
