"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../models/users/auth"));
const misc_1 = require("../helpers/misc");
const bvn_1 = __importDefault(require("../models/bvn/bvn"));
const verify_1 = __importDefault(require("../models/bvn/verify"));
// register
//login
/*
:Promise<RESPONSE_TYPE> {

return new Promise((resolve:any, reject:any)=>{
    
})

}
*/
class CustomersController {
    SendBVNOtp(BVN) {
        return new Promise((resolve, reject) => {
            if (BVN.length) {
                bvn_1.default.findOne({ BVN }, null, (err, data) => {
                    if (data) {
                        (0, misc_1.generateOtp)()
                            .then((otp) => {
                            console.log({ otp, data });
                            new verify_1.default({ BVN, code: otp, phone_number: data.phone, email: data.email, info: data._id })
                                .save((err2, done) => {
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
                                    let success = {
                                        data: [otp],
                                        message: "BVN verification code sent.",
                                        status: 200,
                                        statusCode: "SUCCESS"
                                    };
                                    resolve(success);
                                    return;
                                }
                            });
                        })
                            .catch((myerr) => {
                            console.log(myerr);
                            let err = {
                                data: [],
                                message: "error occurred, please try again..",
                                status: 500,
                                statusCode: "UNKNOWN_ERROR"
                            };
                            reject(err);
                            return;
                        });
                    }
                    else {
                        let err = {
                            data: [],
                            message: "please enter a valid BVN.",
                            status: 404,
                            statusCode: "FORM_REQUIREMENT_ERROR"
                        };
                        reject(err);
                        return;
                    }
                });
            }
            else {
                let err = {
                    data: [],
                    message: "BVN is required.",
                    status: 401,
                    statusCode: "FORM_REQUIREMENT_ERROR"
                };
                reject(err);
                return;
            }
        });
    }
    register(BVN, otp, password) {
        return new Promise((resolve, reject) => {
            if (BVN.length && otp.length && password.length) {
                verify_1.default.findOne({ BVN, code: otp, expiry: { $gte: Date.now() } }, null, (err, data) => {
                    console.log({ BVN, code: otp, expiry: { $gte: Date.now() } });
                    if (data) {
                        (0, misc_1.hashPassword)(password)
                            .then((hash) => {
                            auth_1.default.updateOne({ BVN }, { BVN, password: hash, phone_number: data.phone_number, email: data.email, info: data.info }, { upsert: true }, (err2, done) => {
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
                                    let success = {
                                        data: [],
                                        message: "successful.",
                                        status: 200,
                                        statusCode: "SUCCESS"
                                    };
                                    resolve(success);
                                    return;
                                }
                            });
                            //.save()
                        })
                            .catch((myerr) => {
                            console.log(myerr);
                            let err = {
                                data: [],
                                message: "error occurred, please try again..",
                                status: 500,
                                statusCode: "UNKNOWN_ERROR"
                            };
                            reject(err);
                            return;
                        });
                    }
                    else {
                        let err = {
                            data: [],
                            message: "please enter a valid BVN verification code.",
                            status: 404,
                            statusCode: "FORM_REQUIREMENT_ERROR"
                        };
                        reject(err);
                        return;
                    }
                });
            }
            else {
                let err = {
                    data: [],
                    message: "BVN, OTP and Password are required.",
                    status: 401,
                    statusCode: "FORM_REQUIREMENT_ERROR"
                };
                reject(err);
                return;
            }
        });
    }
    login(email, password) {
        return new Promise((resolve, reject) => {
            if (email.length && password.length) {
                auth_1.default.findOne({ email }, null, { populate: "info" }, (err, data) => {
                    console.log({ data, email, password, err });
                    if (data) {
                        (0, misc_1.decodePwd)(password, data.password)
                            .then((hash) => {
                            let success = {
                                data: [data],
                                message: "successful.",
                                status: 200,
                                statusCode: "SUCCESS"
                            };
                            resolve(success);
                            return;
                        })
                            .catch((myerr) => {
                            console.log(myerr);
                            let err = {
                                data: [],
                                message: "incorrect login details..",
                                status: 500,
                                statusCode: "FORM_REQUIREMENT_ERROR"
                            };
                            reject(err);
                            return;
                        });
                    }
                    else {
                        let err = {
                            data: [],
                            message: "please enter a valid email.",
                            status: 404,
                            statusCode: "FORM_REQUIREMENT_ERROR"
                        };
                        reject(err);
                        return;
                    }
                });
            }
            else {
                let err = {
                    data: [],
                    message: "Email and Password are required.",
                    status: 401,
                    statusCode: "FORM_REQUIREMENT_ERROR"
                };
                reject(err);
                return;
            }
        });
    }
    getUser(email) {
        return new Promise((resolve, reject) => {
            if (email.length) {
                auth_1.default.findOne({ email }, null, { populate: "info" }, (err, data) => {
                    if (data) {
                        let success = {
                            data: [],
                            message: "successful.",
                            status: 200,
                            statusCode: "SUCCESS"
                        };
                        resolve(success);
                        return;
                    }
                    else {
                        let err = {
                            data: [data],
                            message: "No User Found",
                            status: 404,
                            statusCode: "FORM_REQUIREMENT_ERROR"
                        };
                        reject(err);
                        return;
                    }
                });
            }
            else {
                let err = {
                    data: [],
                    message: "Email is required.",
                    status: 401,
                    statusCode: "FORM_REQUIREMENT_ERROR"
                };
                reject(err);
                return;
            }
        });
    }
    getAllUsers() {
        return new Promise((resolve, reject) => {
            auth_1.default.find({}, null, { populate: "info" }, (err, data) => {
                if (data) {
                    let success = {
                        data,
                        message: "successful.",
                        status: 200,
                        statusCode: "SUCCESS"
                    };
                    resolve(success);
                    return;
                }
                else {
                    let err = {
                        data: [],
                        message: "No User Found",
                        status: 404,
                        statusCode: "FORM_REQUIREMENT_ERROR"
                    };
                    reject(err);
                    return;
                }
            });
        });
    }
}
exports.default = new CustomersController();
