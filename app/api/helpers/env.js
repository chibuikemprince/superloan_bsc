"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const env_1 = require("../../env");
const errorReporting_1 = require("./errorReporting");
const getEnv = (key) => {
    key = key.toUpperCase();
    if (env_1.env[key] == undefined) {
        //throw new Error(`${key} is not defined`)
        let err = {
            msg: `${key} is not defined`,
            status: 'WEAK',
            time: new Date().toDateString(),
        };
        (0, errorReporting_1.LogError)(err);
    }
    // console.log(isNaN(<number><unknown>env[key]))
    //console.log(   <unknown>Number(env[key]) as string != <unknown>NaN.toString(), Number(env[key]) )
    return Number(env_1.env[key]) != undefined && !isNaN(env_1.env[key])
        ? Number(env_1.env[key])
        : env_1.env[key];
    //return env[key]? env[key]:"";
};
exports.getEnv = getEnv;
