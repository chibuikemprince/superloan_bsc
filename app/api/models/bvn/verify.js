"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    BVN: {
        type: String,
        required: true,
    },
    info: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    expiry: {
        type: Number,
        default: (Date.now() + (1000 * 10 * 60))
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('VerifyBVN', exports.schema);
