import { model, Schema, Types } from 'mongoose';


import Generic from '../entities/generics';

  
  
export interface VerifyBVN extends Generic {


  BVN: string;
  info: {} | Types.ObjectId;
  code: string; 
  expiry: Number; 
  email:String;
  phone_number: String;


}

export const schema = new Schema<VerifyBVN>(
  {
    BVN: {
      type: String,
      required: true,
    },
    info: {
      type: Types.ObjectId,
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
    code :{
      type: String,
      required: true,
    } ,
    expiry:{
      type: Number,
      default:(Date.now()+(1000*10*60))
    }
  
  

  },

  { timestamps: true }
);

export default model<VerifyBVN>('VerifyBVN', schema);
