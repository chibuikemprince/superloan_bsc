"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseMiddleware = void 0;
const baseMiddleware = (req, res, next) => {
    req.body = Object.assign(Object.assign({}, req.query), req.body);
    if (req.body.hasOwnProperty("start")) {
        req.body.start = Number(req.body.start);
    }
    if (req.body.hasOwnProperty("stop")) {
        req.body.stop = Number(req.body.stop);
    }
    next();
};
exports.baseMiddleware = baseMiddleware;
