import express, { Router } from 'express';
 import LoanMiddleware from '../middlewares/loan';
import { Request, Response, NextFunction } from 'express';
 
//import { authenticateSuperAdmin } from '../middlewares/auth/adminAuth';
//const Admin_Role_MiddleWare_Instance = new Admin_Role_MiddleWare();

let baseRoute: Router = Router();
let pathRoute: Router = Router();
 
 
/* 


   
 */
  //create
pathRoute.post('/user/getdata', LoanMiddleware.getCreditScore); 
pathRoute.post('/user/apply', LoanMiddleware.applyForLoan); 
pathRoute.get('/bank/accounts', LoanMiddleware.userBankAccounts); 
pathRoute.get('/record', LoanMiddleware.loanRecord); 
pathRoute.get('/repay/record', LoanMiddleware.loanRepayment); 
pathRoute.post('/payLoan', LoanMiddleware.payLoan); 



//(req:Request,res:Response,next:NextFunction){

export default baseRoute.use('/loan', pathRoute);
