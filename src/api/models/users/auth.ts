import { model, Schema, Types } from 'mongoose';


import Generic from '../entities/generics';

  
  
export interface Auth extends Generic {


  BVN: string;
  info: {} | Types.ObjectId;
  password: string; 
  status: string; 
  email:String;
  phone_number: String;

}

export const schema = new Schema<Auth>(
  {
    BVN: {
        type: String,
        required: true,
        unique:true
      },  
      
      info: {
        type: Types.ObjectId,
        ref:"BVN"
      }, 
      email: {
        type: String,
        required: true,
      },   
      phone_number: {
        type: String,
        required: true,
      },
    password :{
      type: String,
      required: true,
    } ,
    status:{
      type: String,
      default:"active"
    }
  
  

  },

  { timestamps: true }
);

export default model<Auth>('auth', schema);
