import { Response } from 'express';
import { RESPONSE_TYPE } from './customTypes';
const   bcrypt =  require('bcryptjs');
const hashSync  = bcrypt.hashSync;
const compareSync  = bcrypt.compareSync;
 
const Randomatic =  require('randomatic');

export const response = (res: Response, data: RESPONSE_TYPE) => {
  data.status =
    data.status == undefined || data.status == null ? 500 : data.status;

  res.status(data.status).json(data);
  return;
};


export const hashPassword = (password: String) =>{
  const hashedPwd =  hashSync(password, 10);
 // return ; 

  return new Promise((resolve:any, reject:any)=>{
    resolve( hashedPwd)
   })
}

export const decodePwd = (reqPassword: String, dbPassword: String) =>{
        
  const compare = compareSync(reqPassword, dbPassword);
 

  return new Promise((resolve:any, reject:any)=>{
    resolve( compare)
   })

}


export const generateOtp = ()=>{
  let alpha = ["A","B","C","D","E","F","G","H","J","K","M","N"]
  let index =  parseInt( <string><unknown>(Math.random() * (10 - 1) + 1) )
  let replaceValue = alpha[index];
  replaceValue = replaceValue?replaceValue:"X";
//console.log("replace: ", replaceValue)
   return new Promise((resolve:any, reject:any)=>{
    resolve(Randomatic('A0',6).replace(/[0oOi1Il]/g,replaceValue))
   })
   

}



