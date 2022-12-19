import Customers from "../models/users/auth";
import { RESPONSE_TYPE, } from "../helpers/customTypes";
import { decodePwd,hashPassword,generateOtp } from "../helpers/misc";
import BVNModel from "../models/bvn/bvn";
import verifyBVN from "../models/bvn/verify";
// register
//login

/* 
:Promise<RESPONSE_TYPE> {

return new Promise((resolve:any, reject:any)=>{
    
}) 

}
*/

class CustomersController{

SendBVNOtp(BVN:String) :Promise<RESPONSE_TYPE> {

return new Promise((resolve:any, reject:any)=>{

if(BVN.length){
    BVNModel.findOne({BVN}, null,(err:any, data:any)=>{
        if(data){

            generateOtp()
            .then((otp:any)=>{
             console.log({otp,data})
             new verifyBVN({BVN,code:otp,phone_number:data.phone, email: data.email, info:data._id})
                .save((err2:any,done:any)=>{
if(err2){
   console.log(err2);
    let err:RESPONSE_TYPE ={
        data:[],
        message:"error occurred, please try again..",
        status:500,
        statusCode:"UNKNOWN_ERROR"
        }   
        
        reject(err);
        return;
 }
 else{ 
    let success:RESPONSE_TYPE ={
        data:[otp],
        message:"BVN verification code sent.",
        status:200,
        statusCode:"SUCCESS"
        }   
        
        resolve(success);
        return;
 }
                })


            })
             .catch((myerr:any)=>{
                console.log(myerr)
                let err:RESPONSE_TYPE ={
                    data:[],
                    message:"error occurred, please try again..",
                    status:500,
                    statusCode:"UNKNOWN_ERROR"
                    }   
                    
                    reject(err);
                    return;
             })  



        }
        else{
            let err:RESPONSE_TYPE ={
                data:[],
                message:"please enter a valid BVN.",
                status:404,
                statusCode:"FORM_REQUIREMENT_ERROR"
                }   
                
                reject(err);
                return;
        }
    })
}
else{
    let err:RESPONSE_TYPE ={
data:[],
message:"BVN is required.",
status:401,
statusCode:"FORM_REQUIREMENT_ERROR"
}   

reject(err);
return;
}




}) 

}


register(BVN:String,otp:String, password:String) :Promise<RESPONSE_TYPE> {

    return new Promise((resolve:any, reject:any)=>{
    
    if(BVN.length && otp.length && password.length){
        verifyBVN.findOne({BVN, code:otp, expiry:{$gte:Date.now()}}, null,(err:any, data:any)=>{
      
    console.log({BVN, code:otp, expiry:{$gte:Date.now()}})

             if(data){
         hashPassword(password)
                .then((hash:any)=>{
                
                  Customers.updateOne({BVN},{BVN,password:hash,phone_number:data.phone_number, email: data.email, info:data.info}, { upsert: true }, (err2:any,done:any)=>{
                    if(err2){
                       console.log(err2);
                        let err:RESPONSE_TYPE ={
                            data:[],
                            message:"error occurred, please try again..",
                            status:500,
                            statusCode:"UNKNOWN_ERROR"
                            }   
                            
                            reject(err);
                            return;
                     }
                     else{ 
                        let success:RESPONSE_TYPE ={
                            data:[],
                            message:"successful.",
                            status:200,
                            statusCode:"SUCCESS"
                            }   
                            
                            resolve(success);
                            return;
                     }
                                    })
                //.save()
    
    
                })
                 .catch((myerr:any)=>{
                    console.log(myerr)
                    let err:RESPONSE_TYPE ={
                        data:[],
                        message:"error occurred, please try again..",
                        status:500,
                        statusCode:"UNKNOWN_ERROR"
                        }   
                        
                        reject(err);
                        return;
                 })  
    
    
    
            }
            else{
                let err:RESPONSE_TYPE ={
                    data:[],
                    message:"please enter a valid BVN verification code.",
                    status:404,
                    statusCode:"FORM_REQUIREMENT_ERROR"
                    }   
                    
                    reject(err);
                    return;
            }
        })
    }
    else{
        let err:RESPONSE_TYPE ={
    data:[],
    message:"BVN, OTP and Password are required.",
    status:401,
    statusCode:"FORM_REQUIREMENT_ERROR"
    }   
    
    reject(err);
    return;
    }
    
    
    
    
    }) 
    
    }
    



    login(email:String, password:String) :Promise<RESPONSE_TYPE> {

        return new Promise((resolve:any, reject:any)=>{
        
        if(email.length &&  password.length){
            Customers.findOne({email}, null,{populate:"info"},(err:any, data:any)=>{
               
               console.log({data, email, password, err})
                if(data){
        
                    decodePwd(password, data.password)
                    .then((hash:any)=>{
                    

                        let success:RESPONSE_TYPE ={
                            data:[data],
                            message:"successful.",
                            status:200,
                            statusCode:"SUCCESS"
                            }   
                            
                            resolve(success);
                            return;

                   
        
                    })
                     .catch((myerr:any)=>{
                        console.log(myerr)
                        let err:RESPONSE_TYPE ={
                            data:[],
                            message:"incorrect login details..",
                            status:500,
                            statusCode:"FORM_REQUIREMENT_ERROR"
                            }   
                            
                            reject(err);
                            return;
                     })  
        
        
        
                }
                else{
                    let err:RESPONSE_TYPE ={
                        data:[],
                        message:"please enter a valid email.",
                        status:404,
                        statusCode:"FORM_REQUIREMENT_ERROR"
                        }   
                        
                        reject(err);
                        return;
                }
            })
        }
        else{
            let err:RESPONSE_TYPE ={
        data:[],
        message:"Email and Password are required.",
        status:401,
        statusCode:"FORM_REQUIREMENT_ERROR"
        }   
        
        reject(err);
        return;
        }
        
        
        
        
        }) 
        
        }
        
    
        getUser(email:String ) :Promise<RESPONSE_TYPE> {

            return new Promise((resolve:any, reject:any)=>{
            
            if(email.length  ){
                Customers.findOne({email}, null,{populate:"info"},(err:any, data:any)=>{
                    if(data){
            
                        let success:RESPONSE_TYPE ={
                            data:[],
                            message:"successful.",
                            status:200,
                            statusCode:"SUCCESS"
                            }   
                            
                            resolve(success);
                            return;
                    }
                    else{
                        let err:RESPONSE_TYPE ={
                            data:[data],
                            message:"No User Found",
                            status:404,
                            statusCode:"FORM_REQUIREMENT_ERROR"
                            }   
                            
                            reject(err);
                            return;
                    }
                })
            }
            else{
                let err:RESPONSE_TYPE ={
            data:[],
            message:"Email is required.",
            status:401,
            statusCode:"FORM_REQUIREMENT_ERROR"
            }   
            
            reject(err);
            return;
            }
            
            
            
            
            }) 
            
            }
            

            getAllUsers(  ) :Promise<RESPONSE_TYPE> {

                return new Promise((resolve:any, reject:any)=>{
                
                 
                    Customers.find({}, null,{populate:"info"},(err:any, data:any)=>{
                        if(data){
                
                            let success:RESPONSE_TYPE ={
                                data,
                                message:"successful.",
                                status:200,
                                statusCode:"SUCCESS"
                                }   
                                
                                resolve(success);
                                return;
                        }
                        else{
                            let err:RESPONSE_TYPE ={
                                data:[],
                                message:"No User Found",
                                status:404,
                                statusCode:"FORM_REQUIREMENT_ERROR"
                                }   
                                
                                reject(err);
                                return;
                        }
                    })
                
                
                
                
                
                } ) 
                
                }
                


}


export default new CustomersController();