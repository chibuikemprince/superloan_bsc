export enum UserTypeEnum {
  FREELANCER = 'freelancer',
  BUSINESS = 'business',
  NONE = 'none',
}
export enum UserStatusEnum {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  LOCKED = 'locked',
}

export enum KycVerificationStatusEnum {
  CREATED = 'created',
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  EXPIRED = 'expired',
  NEEDS_REVIEW = 'needs_review',
  APPROVED = 'approved',
  DECLINED = 'declined',
}

export enum FreelancerPortfolioProjectDocumentTypeEnum {
  IMAGE = 'image',
  PDF = 'pdf',
}

export enum DocumentTypeEnum {
  IMAGE = 'image',
  PDF = 'pdf',
}

export enum BudgetType {
  FIXED_PRICE = 'fixed-price',
  PER_HOUR = 'per-hour',
  RANGE = 'range',
}

export enum RateType {
  FIXED_PRICE = 'fixed-price',
  PER_HOUR = 'per-hour',
}

export enum JobStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  PENDING = 'pending',
}
