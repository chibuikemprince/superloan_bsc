import LoanControllers from "../controllers/loan"
import {response} from "../helpers/misc";
import {Request,Response,NextFunction} from "express"
import {RESPONSE_TYPE, categoryData} from "../helpers/customTypes"
import { LogError } from "../helpers/errorReporting";
import { Types } from "mongoose";

 
class LoanMiddleware{




   
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
        msg:"Error found in LoanMiddleware() middleware",
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
    


   
   
    applyForLoan(req:Request,res:Response,next:NextFunction){
    return new Promise((resolve:any, reject:any)=>{
  

    try{

       let {amount, account_number, duration, reason , BVN} = req.body
        let required:any = {amount, account_number, duration, reason , BVN}

        for(var a in required){
            if(!required[a]){
                let feedback: RESPONSE_TYPE = {
                    message:
                      'amount, account_number, duration, reason , and BVN are required.',
                    data: [],
                    status: 400,
                    statusCode: 'FORM_REQUIREMENT_ERROR',
                  };
                  response(res, feedback);
                  return;
            }
        }
         
        LoanControllers.applyForLoan(amount, account_number, duration, reason , BVN)
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
        msg:"Error found in LoanMiddleware() middleware",
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
   
    

    payLoan(req:Request,res:Response,next:NextFunction){
        return new Promise((resolve:any, reject:any)=>{
      
    
        try{
    /* 
    
    loanId: string, amount: number, account_number: string, BVN: string
    */
           let {loanId, amount, account_number , BVN} = req.body
            let required:any = {loanId, amount, account_number , BVN}
    
            for(var a in required){
                if(!required[a]){
                    let feedback: RESPONSE_TYPE = {
                        message:
                          'loanId, amount, account_number, and BVN are required.',
                        data: [],
                        status: 400,
                        statusCode: 'FORM_REQUIREMENT_ERROR',
                      };
                      response(res, feedback);
                      return;
                }
            }
             
            LoanControllers.payLoan(loanId, amount, account_number , BVN)
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
            msg:"Error found in LoanMiddleware() middleware",
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
  

   
    userBankAccounts(req:Request,res:Response,next:NextFunction){
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
             
            LoanControllers.userBankAccounts(req.body.BVN)  
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
            msg:"Error found in LoanMiddleware() middleware",
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
        
        
    
   
        loanRecord(req:Request,res:Response,next:NextFunction){
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
                 
                LoanControllers.loanRecord(req.body.BVN)  
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
                msg:"Error found in LoanMiddleware() middleware",
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
            
            loanRepayment(req:Request,res:Response,next:NextFunction){
                return new Promise((resolve:any, reject:any)=>{
              
            
                try{
            
            
                   
                      if( !req.body.hasOwnProperty("loanId")  || !req.body.loanId.length  ){
                         let feedback: RESPONSE_TYPE = {
                        message:
                          'loanId is required',
                        data: [],
                        status: 400,
                        statusCode: 'FORM_REQUIREMENT_ERROR',
                      };
                      response(res, feedback);
                      return;
                    
                    }
                     
                    LoanControllers.loanRepayment(req.body.loanId)  
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
                    msg:"Error found in LoanMiddleware() middleware",
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



export default new LoanMiddleware();