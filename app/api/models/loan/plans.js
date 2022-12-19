"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    package: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    credit_score: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    interest_rate: {
        type: Number,
        required: true,
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Plans', exports.schema);
