import { Schema } from 'mongoose';

import { KycVerificationStatusEnum } from './enums';
import GenericEntity from './generics';

export interface IKycVerification extends GenericEntity {
  withPersonaInquiryId: string;
  withPersonaSessionToken?: string;
  status: KycVerificationStatusEnum;
}

export const KycVerificationSchema = new Schema<IKycVerification>(
  {
    withPersonaInquiryId: {
      type: String,
      required: true,
    },
    withPersonaSessionToken: String,
    status: {
      type: String,
      enum: Object.values(KycVerificationStatusEnum),
    },
  },
  { timestamps: true },
);
