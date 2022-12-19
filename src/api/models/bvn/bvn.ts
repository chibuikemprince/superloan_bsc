import { model, Schema, Types } from 'mongoose';


import Generic from '../entities/generics';

  
  
export interface BVN extends Generic {
  name: string;
  profileimage: string;
  blacklisted: boolean;
  state_origin: string;
  lga_origin: string;
  nin: string;
  phone: string;
  email: string;
  dob: string;
  address: string;
  occupation: string;
  next_kin: string;
  next_kin_phone: string;
  marital_status:string;
  landmark:string;
  gender:string;
  nationality:string;
  BVN: string;







}

export const schema = new Schema<BVN>(
  {
    name: {
      type: String,
      required: true,
    },  
    BVN: {
      type: String,
      required: true,
    },
      profileimage:{
      type: String,
      required: true,
    },
  state_origin:{
      type: String,
      required: true,
    },
  lga_origin:{
      type: String,
      required: true,
    },
  nin:{
      type: String,
      required: true,
    },
  phone:{
      type: String,
      required: true,
    },
  email:{
      type: String,
      required: true,
    },
  dob:{
      type: String,
      required: true,
    },
  address:{
      type: String,
      required: true,
    },
  occupation:{
      type: String,
      required: true,
    },
  next_kin:{
      type: String,
      required: true,
    },
  next_kin_phone:{
      type: String,
      required: true,
    },
  marital_status:{
    type: String,
    required: true,
  },
  landmark:{
    type: String,
    required: true,
  },
  gender:{
    type: String,
    required: true,
  },
  nationality:{
    type: String,
    required: true,
  },
  blacklisted:{
    type: Boolean,
    required: true,
    default:false
  }
  


  },

  { timestamps: true }
);

export default model<BVN>('BVN', schema);
