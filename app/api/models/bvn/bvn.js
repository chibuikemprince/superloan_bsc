"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    BVN: {
        type: String,
        required: true,
    },
    profileimage: {
        type: String,
        required: true,
    },
    state_origin: {
        type: String,
        required: true,
    },
    lga_origin: {
        type: String,
        required: true,
    },
    nin: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    next_kin: {
        type: String,
        required: true,
    },
    next_kin_phone: {
        type: String,
        required: true,
    },
    marital_status: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('BVN', exports.schema);
