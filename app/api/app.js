"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const baseMiddleWare_1 = require("./middlewares/baseMiddleWare");
const misc_1 = require("./helpers/misc");
const errorReporting_1 = require("./helpers/errorReporting");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
//routes 
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(baseMiddleWare_1.baseMiddleware);
//auth
app.use("/api", auth_1.default);
app.use('*', (req, res, next) => {
    var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;
    let notFoundRes = {
        message: `${fullURL} page not found`,
        data: [],
        status: 404,
        statusCode: 'PAGE_NOT_FOUND',
    };
    (0, misc_1.response)(res, notFoundRes);
});
app.use((error, req, res, next) => {
    let errorLog = {
        msg: 'error found: ',
        stack: error.stack,
        status: 'STRONG',
        time: new Date().toDateString(),
    };
    (0, errorReporting_1.LogError)(errorLog);
    let error_res = {
        message: 'error detected, please try again.',
        data: [],
        status: 500,
        statusCode: 'UNKNOWN_ERROR',
    };
    (0, misc_1.response)(res, error_res);
});
exports.default = app;
