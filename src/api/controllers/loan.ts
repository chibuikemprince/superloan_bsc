import { RESPONSE_TYPE } from "../helpers/customTypes";
import BankAccounts from "../models/bank/accounts";
import LoanRecords from "../models/loan/record";
import BVNModel from "../models/bvn/bvn";
import { getEnv } from "../helpers/env";
// get bank accounts


class Loan{
// credit score

getLoanStatus(BVN:String):Promise<RESPONSE_TYPE> {

    return new Promise((resolve:any, reject:any)=>{
        BVNModel.findOne({BVN}, null,(err2:any, data:any)=>{

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
                if(data){
                    console.log({data})
if(data.blacklisted == true){
    let success:RESPONSE_TYPE ={
        data:[],
        message:"You have been blacklisted.",
        status:200,
        statusCode:"SUCCESS"
        }   
        
        resolve(success);
        return;
}
else{
    let success:RESPONSE_TYPE ={
        data:[],
        message:"You are qualified for loans",
        status:200,
        statusCode:"SUCCESS"
        }   
        
        resolve(success);
        return;
}



                } else{
                    let success:RESPONSE_TYPE ={
                        data:[],
                        message:"Invalid BVN",
                        status:404,
                        statusCode:"RESOURCE_NOT_FOUND"
                        }   
                        
                        resolve(success);
                        return;
                }
               
              }




        }  )  




    }) 
    
    }


getGetLoanOwed(BVN:String):Promise<RESPONSE_TYPE> {

    return new Promise((resolve:any, reject:any)=>{
        
        LoanRecords.findOne({BVN}, null,(err2:any, data:any)=>{

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

                if(data){
                    console.log({data})
if(data.amount == data.amount_paid){
    let success:RESPONSE_TYPE ={
        data:[],
        message:"You have paid all loans.",
        status:200,
        statusCode:"LOAN_PAID"
        }   
        
        resolve(success);
        return;
}
else{
    let success:RESPONSE_TYPE ={
        data:[data],
        message:"You have not paid your loan.",
        status:200,
        statusCode:"LOAN_NOT_PAID"
        }   
        
        resolve(success);
        return;
}



                } else{
                    let success:RESPONSE_TYPE ={
                        data:[],
                        message:"You don't owe",
                        status:200,
                        statusCode:"NO_LOAN_OWED"
                        }   
                        
                        resolve(success);
                        return;
                }



              }
            
            }
                
                )

    }) 
    
    }

creditScore(BVN:String):Promise<RESPONSE_TYPE> {

    return new Promise((resolve:any, reject:any)=>{
       
        
  
        BankAccounts.find({BVN}, null,(err2:any, data:any)=>{

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

                if(data.length){
             let totalCreditScore = 0; 
             let count = 1;  
             let len = data.length;   
data.forEach((account:any) => {
    totalCreditScore = totalCreditScore+(account.credit_score)
     count = count +1

if(count==len){
    let credit_score = totalCreditScore/len;
    let loanplans:any[] = [parseInt(<string><unknown>credit_score)]

    if(credit_score>=5000){
let creditScoreMark = credit_score;
while(creditScoreMark>5000){
    creditScoreMark = creditScoreMark-5000;
loanplans.push(parseInt(<string><unknown>creditScoreMark))

if(creditScoreMark>5000){
    let success:RESPONSE_TYPE ={
        data:loanplans,
        message:"you are qualified to borrow.",
        status:200,
        statusCode:"SUCCESS"
        }   
        
        reject(success);
        return;
}
}





    }
    else{
        let success:RESPONSE_TYPE ={
            data:[],
            message:"You don't a high credit score.",
            status:200,
            statusCode:"LOW_CREDIT_SCORE"
            }   
            
            reject(success);
            return;
    }


}

});

                } else{
                    let success:RESPONSE_TYPE ={
                        data:[],
                        message:"You don't an active bank account, please ensure you create one before applying for loans.",
                        status:200,
                        statusCode:"NO_BANK_ACCOUNT"
                        }   
                        
                        reject(success);
                        return;
                }



              }
            
            }
                
                )


    }) 
    
    }

applyForLoan(amount:number, account_number:string, duration:number, reason:string , BVN:string):Promise<RESPONSE_TYPE> {

    return new Promise((resolve:any, reject:any)=>{
        let interest_rate:number = <number>getEnv("INTEREST");


        new LoanRecords({
            amount,
            account_number,
            duration,
            reason,
            BVN
        }).save()

        BankAccounts.updateOne({BVN,account_number},{$inc:{balance:amount} }, (err2:any, docs:any)=>{
            if (err2){
                console.log(err2)
               
                     
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
          
                let res:RESPONSE_TYPE ={
                    data:[],
                    message:"Loan successfully disbursed to your account",
                    status:200,
                    statusCode:"SUCCESS"
                    }   
                    
                    resolve(res);
                    return;
          
          //      console.log("Updated Docs : ", docs);
            }


            })



    }) 
    
    }

}



