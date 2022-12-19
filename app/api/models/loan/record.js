"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    BVN: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    bank_account: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    amount_paid: {
        type: Number,
        default: 0
    },
    date: {
        type: Number,
        default: Date.now(),
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Record', exports.schema);
