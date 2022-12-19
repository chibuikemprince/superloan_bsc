"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loan_1 = __importDefault(require("../middlewares/loan"));
//import { authenticateSuperAdmin } from '../middlewares/auth/adminAuth';
//const Admin_Role_MiddleWare_Instance = new Admin_Role_MiddleWare();
let baseRoute = (0, express_1.Router)();
let pathRoute = (0, express_1.Router)();
/*


   
 */
//create
pathRoute.post('/user/getdata', loan_1.default.getCreditScore);
//(req:Request,res:Response,next:NextFunction){
exports.default = baseRoute.use('/loan', pathRoute);
