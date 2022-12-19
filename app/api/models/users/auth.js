"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    BVN: {
        type: String,
        required: true,
        unique: true
    },
    info: {
        type: mongoose_1.Types.ObjectId,
        ref: "BVN"
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "active"
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('auth', exports.schema);
