import LoanControllers from "../controllers/loan"
import {response} from "../helpers/misc";
import {Request,Response,NextFunction} from "express"
import {RESPONSE_TYPE, categoryData} from "../helpers/customTypes"
import { LogError } from "../helpers/errorReporting";
import { Types } from "mongoose";

 
class CustomerMiddleware{





  getCreditScore(req:Request,res:Response,next:NextFunction){
    return new Promise((resolve:any, reject:any)=>{
  

    try{


       
          if( !req.body.hasOwnProperty("BVN")  || !req.body.BVN.length  ){
             let feedback: RESPONSE_TYPE = {
            message:
              'BVN is required',
            data: [],
            status: 400,
            statusCode: 'FORM_REQUIREMENT_ERROR',
          };
          response(res, feedback);
          return;
        
        }
         
        LoanControllers.creditScore(req.body.BVN)  
       //CategoryCrud.create(req.body.name, req.body.skills)
        .then( (done:RESPONSE_TYPE) =>{
            // console.log({done})
            
              response(res, done);
              return;
         })
         .catch((err:any)=>{
            console.log({err})
             response(res,err)
            //throw err;
         }) 
         
    

}
    catch(err:any){
      LogError({
        msg:"Error found in createCategory() middleware",
        status:"STRONG",
        time:new Date().toUTCString(),
        stack:<string>err,
        class:<string><unknown>this

      })
      let feedback: RESPONSE_TYPE = {
        message:
          'error found, please try again. If this persists contact support',
        data: [],
        status: 500,
        statusCode: 'UNKNOWN_ERROR',
      };
      response(res, feedback);
      return;
    }
        
    
    
    
    })
    
    }
    
 

    
  
}



export default new CustomerMiddleware();