import { model, Schema, Types } from 'mongoose';


import Generic from '../entities/generics';

  
  
export interface Bank extends Generic {


  name: string;
  BVN: string;
  account_number: Number;
bank: string;
  credit_score: Number;
  balance: Number; 


}

export const schema = new Schema<Bank>(
  {
    name: {
      type: String,
      required: true
    },
    BVN:{
        type: String,
        required: true
    },
    account_number :{
      type: Number,
      required: true,
    },
    credit_score:{
      type: Number,
      required: true,
    },
  bank:{
      type: String,
      required: true,
    },
    balance:{
      type: Number,
      required: true,
    }
  
  

  },

  { timestamps: true }
);

export default model<Bank>('Bank', schema);
