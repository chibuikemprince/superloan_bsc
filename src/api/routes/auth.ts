import express, { Router } from 'express';
 import CustomerMiddleware from '../middlewares/customers';
import { Request, Response, NextFunction } from 'express';
 
//import { authenticateSuperAdmin } from '../middlewares/auth/adminAuth';
//const Admin_Role_MiddleWare_Instance = new Admin_Role_MiddleWare();

let baseRoute: Router = Router();
let pathRoute: Router = Router();
 
 
/* 


   
 */
  //create
pathRoute.post('/bvn/getotp', CustomerMiddleware.verifyBVN);
pathRoute.post('/user/register', CustomerMiddleware.registration);
pathRoute.post('/user/login', CustomerMiddleware.login);
 
//(req:Request,res:Response,next:NextFunction){

export default baseRoute.use('/auth', pathRoute);
