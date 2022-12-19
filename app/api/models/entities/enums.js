"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobStatus = exports.RateType = exports.BudgetType = exports.DocumentTypeEnum = exports.FreelancerPortfolioProjectDocumentTypeEnum = exports.KycVerificationStatusEnum = exports.UserStatusEnum = exports.UserTypeEnum = void 0;
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["FREELANCER"] = "freelancer";
    UserTypeEnum["BUSINESS"] = "business";
    UserTypeEnum["NONE"] = "none";
})(UserTypeEnum = exports.UserTypeEnum || (exports.UserTypeEnum = {}));
var UserStatusEnum;
(function (UserStatusEnum) {
    UserStatusEnum["ACTIVE"] = "active";
    UserStatusEnum["SUSPENDED"] = "suspended";
    UserStatusEnum["LOCKED"] = "locked";
})(UserStatusEnum = exports.UserStatusEnum || (exports.UserStatusEnum = {}));
var KycVerificationStatusEnum;
(function (KycVerificationStatusEnum) {
    KycVerificationStatusEnum["CREATED"] = "created";
    KycVerificationStatusEnum["PENDING"] = "pending";
    KycVerificationStatusEnum["COMPLETED"] = "completed";
    KycVerificationStatusEnum["FAILED"] = "failed";
    KycVerificationStatusEnum["EXPIRED"] = "expired";
    KycVerificationStatusEnum["NEEDS_REVIEW"] = "needs_review";
    KycVerificationStatusEnum["APPROVED"] = "approved";
    KycVerificationStatusEnum["DECLINED"] = "declined";
})(KycVerificationStatusEnum = exports.KycVerificationStatusEnum || (exports.KycVerificationStatusEnum = {}));
var FreelancerPortfolioProjectDocumentTypeEnum;
(function (FreelancerPortfolioProjectDocumentTypeEnum) {
    FreelancerPortfolioProjectDocumentTypeEnum["IMAGE"] = "image";
    FreelancerPortfolioProjectDocumentTypeEnum["PDF"] = "pdf";
})(FreelancerPortfolioProjectDocumentTypeEnum = exports.FreelancerPortfolioProjectDocumentTypeEnum || (exports.FreelancerPortfolioProjectDocumentTypeEnum = {}));
var DocumentTypeEnum;
(function (DocumentTypeEnum) {
    DocumentTypeEnum["IMAGE"] = "image";
    DocumentTypeEnum["PDF"] = "pdf";
})(DocumentTypeEnum = exports.DocumentTypeEnum || (exports.DocumentTypeEnum = {}));
var BudgetType;
(function (BudgetType) {
    BudgetType["FIXED_PRICE"] = "fixed-price";
    BudgetType["PER_HOUR"] = "per-hour";
    BudgetType["RANGE"] = "range";
})(BudgetType = exports.BudgetType || (exports.BudgetType = {}));
var RateType;
(function (RateType) {
    RateType["FIXED_PRICE"] = "fixed-price";
    RateType["PER_HOUR"] = "per-hour";
})(RateType = exports.RateType || (exports.RateType = {}));
var JobStatus;
(function (JobStatus) {
    JobStatus["AVAILABLE"] = "available";
    JobStatus["UNAVAILABLE"] = "unavailable";
    JobStatus["ONGOING"] = "ongoing";
    JobStatus["COMPLETED"] = "completed";
    JobStatus["PENDING"] = "pending";
})(JobStatus = exports.JobStatus || (exports.JobStatus = {}));
