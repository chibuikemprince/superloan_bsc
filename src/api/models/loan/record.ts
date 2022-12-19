import { model, Schema, Types } from 'mongoose';


import Generic from '../entities/generics';

  
  
export interface Record extends Generic {


  BVN: string;
  reason: string;
  amount: Number;
  amount_paid: Number;
  date: Number;
  duration: Number;
 bank_account: {} | Types.ObjectId;
  


}

export const schema = new Schema<Record>(
  {
    BVN: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    duration:{
      type: Number,
      required: true,
    },
    bank_account: {
        type: Types.ObjectId,
        required: true,
      },
    amount :{
      type: Number,
      required: true,
    },
    amount_paid :{
        type: Number,
       default:0
      },
    
    date:{
      type: Number,
      default: Date.now(),
    } 
  
  

  },

  { timestamps: true }
);

export default model<Record>('Record', schema);
