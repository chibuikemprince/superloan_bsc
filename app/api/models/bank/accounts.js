"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    BVN: {
        type: String,
        required: true
    },
    account_number: {
        type: Number,
        required: true,
    },
    credit_score: {
        type: Number,
        required: true,
    },
    bank: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Bank', exports.schema);
