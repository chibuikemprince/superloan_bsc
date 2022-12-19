import { RESPONSE_TYPE } from "../helpers/customTypes";
import BankAccounts from "../models/bank/accounts";
import LoanRecords from "../models/loan/record";
import LoanRepayment from "../models/loan/repayments";
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
        statusCode:"BLACKLISTED"
        }   
        
        resolve(success);
        return;
}
else{
    let success:RESPONSE_TYPE ={
        data:[],
        message:"You are qualified for loans",
        status:200,
        statusCode:"NOT_BLACKLISTED"
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



    loanRepayment(loanId:String):Promise<RESPONSE_TYPE> {

        return new Promise((resolve:any, reject:any)=>{
            //, populate: "record"
            LoanRepayment.find({record:loanId}, null,{sort:{date:-1}},(err2:any, data:any)=>{
    
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
                        

    
    let success:RESPONSE_TYPE ={
            data,
            message:"loan repayment history returned.",
            status:200,
            statusCode:"SUCCESS"
            }   
            
            resolve(success);
            return;
    
                    } else{
                        let success:RESPONSE_TYPE ={
                            data:[],
                            message:"You have not started payment yet.",
                            status:200,
                            statusCode:"SUCCESS"
                            }   
                            
                            resolve(success);
                            return;
                    }
    
    
    
                  }
                
                }
                    
                    )
    
        }) 
        
        }

    loanRecord(BVN:String):Promise<RESPONSE_TYPE> {

        return new Promise((resolve:any, reject:any)=>{
            
            LoanRecords.find({BVN}, null,{sort:{date:-1}},(err2:any, data:any)=>{
    
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
                        

    
    let success:RESPONSE_TYPE ={
            data: data.map((loan:any)=>{
                let status = "not paid"
                    if(data.amount == data.amount_paid){
                        status = "paid"
                    }
                let newData:any = loan;
                newData.status = status;
                return newData;     
                
                 }),
            message:"loan history returned.",
            status:200,
            statusCode:"SUCCESS"
            }   
            
            resolve(success);
            return;
    
                    } else{
                        let success:RESPONSE_TYPE ={
                            data:[],
                            message:"You have not borrowed yet.",
                            status:200,
                            statusCode:"SUCCESS"
                            }   
                            
                            resolve(success);
                            return;
                    }
    
    
    
                  }
                
                }
                    
                    )
    
        }) 
        
        }
    


getGetLoanOwed(BVN:String):Promise<RESPONSE_TYPE> {

    return new Promise((resolve:any, reject:any)=>{
        
        LoanRecords.findOne({BVN}, null,{sort:{date:-1}},(err2:any, data:any)=>{

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
if(data.amount <= data.amount_paid){
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
       
        this.getLoanStatus(BVN)
        .then((black:any)=>{
console.log({black})

if(black.statusCode=="NOT_BLACKLISTED"){

this.getGetLoanOwed(BVN)
.then((owed:any)=>{
    console.log({owed,BVN})
if(owed.statusCode=="LOAN_PAID" || owed.statusCode=="NO_LOAN_OWED"){

    BankAccounts.find({BVN}, null,(err2:any, data:any)=>{
console.log({acc:data})
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
 

if(count==len){
let credit_score = totalCreditScore/len;
let loanplans:any[] = [parseInt(<string><unknown>credit_score)]

console.log({totalCreditScore, len,credit_score})

if(credit_score>=5000){
let creditScoreMark = credit_score;
while(creditScoreMark>5000){
creditScoreMark = creditScoreMark-5000;
loanplans.push(parseInt(<string><unknown>creditScoreMark))

if(creditScoreMark<5000){
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
count = count +1
});

            } 
            else{
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
}
    
else{
    reject(owed)
    return;
}
})
.catch((err:any)=>{
    reject(err);
    return;
})


}
else{
    reject( black)
    return;
}
        })
        .catch((err:any)=>{
            reject(err)
            return;
        })
  


    }) 
    
    }

applyForLoan(amount:number, account_number:string, duration:number, reason:string , BVN:string):Promise<RESPONSE_TYPE> {

    return new Promise((resolve:any, reject:any)=>{
        let interest_rate:number = <number>getEnv("INTEREST");
let monthly_interest = (amount*interest_rate)/100 ;
let total_interest = (monthly_interest*duration)/30

        




            
        this.getLoanStatus(BVN)
        .then((black:any)=>{
console.log({black})

if(black.statusCode=="NOT_BLACKLISTED"){

this.getGetLoanOwed(BVN)
.then((owed:any)=>{
    console.log({owed,BVN})
if(owed.statusCode=="LOAN_PAID" || owed.statusCode=="NO_LOAN_OWED"){

    console.log({
    total_interest,
    interest_rate,
    monthly_interest,
    amount,
    account_number,
    duration,
    reason,
    BVN
})

 new LoanRecords({
            amount:amount+total_interest,
            bank_account:account_number,
            duration,
            reason,
            BVN
        }).save()

        BankAccounts.updateOne({BVN,account_number},{$inc:{balance:(amount)} }, (err2:any, docs:any)=>{
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



        }
    
else{
    reject(owed)
    return;
}
})
.catch((err:any)=>{
    reject(err);
    return;
})


}
else{
    reject( black)
    return;
}
        })
        .catch((err:any)=>{
            reject(err)
            return;
        })
  


    }) 
    
    }


    payLoan(loanId:string, amount:number, account_number:string, BVN:string):Promise<RESPONSE_TYPE> {

        return new Promise((resolve:any, reject:any)=>{
             
            LoanRecords.updateOne({_id:loanId},{$inc:{amount_paid:amount}},(err:any,data:any)=>{})
            BankAccounts.updateOne({BVN,account_number},{$inc:{balance:(0-amount)} }, (err2:any, docs:any)=>{
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
              
new LoanRepayment({
    record: loanId,
    amount, 
   bank_account: account_number
}).save()
                    
                    let res:RESPONSE_TYPE ={
                        data:[],
                        message:`Amount(₦${amount}) successfully deducted from your account, to pay loan`,
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
    

        userBankAccounts(BVN:string):Promise<RESPONSE_TYPE> {

            return new Promise((resolve:any, reject:any)=>{
                BankAccounts.find({BVN},null, (err2:any, data:any)=>{
                    if(data.length){
                        let success:RESPONSE_TYPE ={
                            data,
                            message:"bank account fetched.",
                            status:200,
                            statusCode:"SUCCESS"
                            }   
                            
                            resolve(success);
                            return;
                    }
else{
    let success:RESPONSE_TYPE ={
        data:[],
        message:"bank account not found.",
        status:404,
        statusCode:"RESOURCE_NOT_FOUND"
        }   
        
        resolve(success);
        return;
}                })
            }) 
            
            }





autoPay(BVN:string):Promise<RESPONSE_TYPE> {

    return new Promise((resolve:any, reject:any)=>{
        this.userBankAccounts(BVN)
        .then((account:any)=>{


let allAccounts = account.data
allAccounts.forEach((ele:any) => {
    

});

        })
        .catch((err:any)=>{
            reject({
                data:[],
                message:"No back account, found for repayment.",
                status:200,
                statusCode:"SUCCESS"
            })
            return;
        })
    }) 
    
    }



}

export default new Loan()

