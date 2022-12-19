import { model, Schema, Types } from 'mongoose';


import Generic from '../entities/generics';

  
  
export interface Repayments extends Generic {


  record: {} | Types.ObjectId;
  amount: Number;
   
  date: Number;
 bank_account: {} | Types.ObjectId;
  


}

export const schema = new Schema<Repayments>(
  {
    record: {
      type: Types.ObjectId,
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
    
    
    date:{
      type: Number,
      default: Date.now(),
    } 
  
  

  },

  { timestamps: true }
);

export default model<Repayments>('Repayments', schema);
