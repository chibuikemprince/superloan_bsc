"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customers_1 = __importDefault(require("../middlewares/customers"));
//import { authenticateSuperAdmin } from '../middlewares/auth/adminAuth';
//const Admin_Role_MiddleWare_Instance = new Admin_Role_MiddleWare();
let baseRoute = (0, express_1.Router)();
let pathRoute = (0, express_1.Router)();
/*


   
 */
//create
pathRoute.post('/bvn/getotp', customers_1.default.verifyBVN);
pathRoute.post('/user/register', customers_1.default.registration);
pathRoute.post('/user/login', customers_1.default.login);
//(req:Request,res:Response,next:NextFunction){
exports.default = baseRoute.use('/auth', pathRoute);
