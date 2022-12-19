"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accounts_1 = __importDefault(require("../models/bank/accounts"));
const record_1 = __importDefault(require("../models/loan/record"));
const bvn_1 = __importDefault(require("../models/bvn/bvn"));
const env_1 = require("../helpers/env");
// get bank accounts
class Loan {
    // credit score
    getLoanStatus(BVN) {
        return new Promise((resolve, reject) => {
            bvn_1.default.findOne({ BVN }, null, (err2, data) => {
                if (err2) {
                    console.log(err2);
                    let err = {
                        data: [],
                        message: "error occurred, please try again..",
                        status: 500,
                        statusCode: "UNKNOWN_ERROR"
                    };
                    reject(err);
                    return;
                }
                else {
                    if (data) {
                        console.log({ data });
                        if (data.blacklisted == true) {
                            let success = {
                                data: [],
                                message: "You have been blacklisted.",
                                status: 200,
                                statusCode: "BLACKLISTED"
                            };
                            resolve(success);
                            return;
                        }
                        else {
                            let success = {
                                data: [],
                                message: "You are qualified for loans",
                                status: 200,
                                statusCode: "NOT_BLACKLISTED"
                            };
                            resolve(success);
                            return;
                        }
                    }
                    else {
                        let success = {
                            data: [],
                            message: "Invalid BVN",
                            status: 404,
                            statusCode: "RESOURCE_NOT_FOUND"
                        };
                        resolve(success);
                        return;
                    }
                }
            });
        });
    }
    getGetLoanOwed(BVN) {
        return new Promise((resolve, reject) => {
            record_1.default.findOne({ BVN }, null, (err2, data) => {
                if (err2) {
                    console.log(err2);
                    let err = {
                        data: [],
                        message: "error occurred, please try again..",
                        status: 500,
                        statusCode: "UNKNOWN_ERROR"
                    };
                    reject(err);
                    return;
                }
                else {
                    if (data) {
                        console.log({ data });
                        if (data.amount == data.amount_paid) {
                            let success = {
                                data: [],
                                message: "You have paid all loans.",
                                status: 200,
                                statusCode: "LOAN_PAID"
                            };
                            resolve(success);
                            return;
                        }
                        else {
                            let success = {
                                data: [data],
                                message: "You have not paid your loan.",
                                status: 200,
                                statusCode: "LOAN_NOT_PAID"
                            };
                            resolve(success);
                            return;
                        }
                    }
                    else {
                        let success = {
                            data: [],
                            message: "You don't owe",
                            status: 200,
                            statusCode: "NO_LOAN_OWED"
                        };
                        resolve(success);
                        return;
                    }
                }
            });
        });
    }
    creditScore(BVN) {
        return new Promise((resolve, reject) => {
            this.getLoanStatus(BVN)
                .then((black) => {
                console.log({ black });
                if (black.statusCode == "NOT_BLACKLISTED") {
                    this.getGetLoanOwed(BVN)
                        .then((owed) => {
                        console.log({ owed, BVN });
                        if (owed.statusCode == "LOAN_PAID" || owed.statusCode == "NO_LOAN_OWED") {
                            accounts_1.default.find({ BVN }, null, (err2, data) => {
                                console.log({ acc: data });
                                if (err2) {
                                    console.log(err2);
                                    let err = {
                                        data: [],
                                        message: "error occurred, please try again..",
                                        status: 500,
                                        statusCode: "UNKNOWN_ERROR"
                                    };
                                    reject(err);
                                    return;
                                }
                                else {
                                    if (data.length) {
                                        let totalCreditScore = 0;
                                        let count = 1;
                                        let len = data.length;
                                        data.forEach((account) => {
                                            totalCreditScore = totalCreditScore + (account.credit_score);
                                            if (count == len) {
                                                let credit_score = totalCreditScore / len;
                                                let loanplans = [parseInt(credit_score)];
                                                console.log({ totalCreditScore, len, credit_score });
                                                if (credit_score >= 5000) {
                                                    let creditScoreMark = credit_score;
                                                    while (creditScoreMark > 5000) {
                                                        creditScoreMark = creditScoreMark - 5000;
                                                        loanplans.push(parseInt(creditScoreMark));
                                                        if (creditScoreMark < 5000) {
                                                            let success = {
                                                                data: loanplans,
                                                                message: "you are qualified to borrow.",
                                                                status: 200,
                                                                statusCode: "SUCCESS"
                                                            };
                                                            reject(success);
                                                            return;
                                                        }
                                                    }
                                                }
                                                else {
                                                    let success = {
                                                        data: [],
                                                        message: "You don't a high credit score.",
                                                        status: 200,
                                                        statusCode: "LOW_CREDIT_SCORE"
                                                    };
                                                    reject(success);
                                                    return;
                                                }
                                            }
                                            count = count + 1;
                                        });
                                    }
                                    else {
                                        let success = {
                                            data: [],
                                            message: "You don't an active bank account, please ensure you create one before applying for loans.",
                                            status: 200,
                                            statusCode: "NO_BANK_ACCOUNT"
                                        };
                                        reject(success);
                                        return;
                                    }
                                }
                            });
                        }
                        else {
                            reject(owed);
                            return;
                        }
                    })
                        .catch((err) => {
                        reject(err);
                        return;
                    });
                }
                else {
                    reject(black);
                    return;
                }
            })
                .catch((err) => {
                reject(err);
                return;
            });
        });
    }
    applyForLoan(amount, account_number, duration, reason, BVN) {
        return new Promise((resolve, reject) => {
            let interest_rate = (0, env_1.getEnv)("INTEREST");
            let monthly_interest = (amount * interest_rate) / 100;
            let total_interest = (monthly_interest * duration) / 30;
            new record_1.default({
                amount,
                account_number,
                duration,
                reason,
                BVN
            }).save();
            accounts_1.default.updateOne({ BVN, account_number }, { $inc: { balance: (amount + total_interest) } }, (err2, docs) => {
                if (err2) {
                    console.log(err2);
                    let err = {
                        data: [],
                        message: "error occurred, please try again..",
                        status: 500,
                        statusCode: "UNKNOWN_ERROR"
                    };
                    reject(err);
                    return;
                }
                else {
                    let res = {
                        data: [],
                        message: "Loan successfully disbursed to your account",
                        status: 200,
                        statusCode: "SUCCESS"
                    };
                    resolve(res);
                    return;
                    //      console.log("Updated Docs : ", docs);
                }
            });
        });
    }
    payLoan(loanId, amount, account_number, BVN) {
        return new Promise((resolve, reject) => {
            record_1.default.updateOne({ _id: loanId }, { $inc: { amount_paid: amount } }, (err, data) => { });
            accounts_1.default.updateOne({ BVN, account_number }, { $inc: { balance: (0 - amount) } }, (err2, docs) => {
                if (err2) {
                    console.log(err2);
                    let err = {
                        data: [],
                        message: "error occurred, please try again..",
                        status: 500,
                        statusCode: "UNKNOWN_ERROR"
                    };
                    reject(err);
                    return;
                }
                else {
                    let res = {
                        data: [],
                        message: `Amount(₦${amount}) successfully deducted from your account, to pay loan`,
                        status: 200,
                        statusCode: "SUCCESS"
                    };
                    resolve(res);
                    return;
                    //      console.log("Updated Docs : ", docs);
                }
            });
        });
    }
    userBankAccounts(BVN) {
        return new Promise((resolve, reject) => {
            accounts_1.default.find({ BVN }, null, (err2, data) => {
                if (data.length) {
                    let success = {
                        data,
                        message: "bank account fetched.",
                        status: 200,
                        statusCode: "SUCCESS"
                    };
                    resolve(success);
                    return;
                }
                else {
                    let success = {
                        data: [],
                        message: "bank account not found.",
                        status: 404,
                        statusCode: "RESOURCE_NOT_FOUND"
                    };
                    resolve(success);
                    return;
                }
            });
        });
    }
    autoPay(BVN) {
        return new Promise((resolve, reject) => {
            this.userBankAccounts(BVN)
                .then((account) => {
                let allAccounts = account.data;
                allAccounts.forEach((ele) => {
                });
            })
                .catch((err) => {
                reject({
                    data: [],
                    message: "No back account, found for repayment.",
                    status: 200,
                    statusCode: "SUCCESS"
                });
                return;
            });
        });
    }
}
exports.default = new Loan();
