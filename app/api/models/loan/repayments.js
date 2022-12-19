"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    record: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    bank_account: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        default: Date.now(),
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Repayments', exports.schema);
