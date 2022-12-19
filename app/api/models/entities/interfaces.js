"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycVerificationSchema = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("./enums");
exports.KycVerificationSchema = new mongoose_1.Schema({
    withPersonaInquiryId: {
        type: String,
        required: true,
    },
    withPersonaSessionToken: String,
    status: {
        type: String,
        enum: Object.values(enums_1.KycVerificationStatusEnum),
    },
}, { timestamps: true });
