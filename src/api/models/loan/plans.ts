import { model, Schema, Types } from 'mongoose';


import Generic from '../entities/generics';

  
  
export interface Plans extends Generic {


  package: string;
  amount: Number;
  duration: Number;

  credit_score: Number;
  interest_rate: Number; 


}

export const schema = new Schema<Plans>(
  {
    package: {
      type: String,
      required: true,
    },
    amount :{
      type: Number,
      required: true,
    },
    credit_score:{
      type: Number,
      required: true,
    },
    duration:{
      type: Number,
      required: true,
    },
    interest_rate:{
      type: Number,
      required: true,
    }
  
  

  },

  { timestamps: true }
);

export default model<Plans>('Plans', schema);
