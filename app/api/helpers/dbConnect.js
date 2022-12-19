"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApp = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
var DBURI = (0, env_1.getEnv)('DB');
if (process.env.APP_ENV == 'production') {
    DBURI = (0, env_1.getEnv)('DB_PRODUCTION');
}
console.log({ DBURI, env: process.env.APP_ENV });
const startApp = (app, port) => {
    mongoose_1.default
        .connect(DBURI)
        .then((start) => {
        app.listen(port, () => {
            console.log({
                message: 'App is now running.',
                port,
                DBURI,
            });
        });
    })
        .catch((err) => {
        let myerr = {
            msg: 'Error found, app could not start',
            stack: err.stack,
            status: 'STRONG',
            time: new Date().toDateString(),
        };
        console.log({ myerr });
    });
};
exports.startApp = startApp;
