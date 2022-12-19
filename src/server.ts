import app from "./api/app";
import {getEnv} from "./api/helpers/env";
import {LogError, ErrorDataType} from "./api/helpers/errorReporting"; 
import { startApp } from "./api/helpers/dbConnect"; "./api/helpers/dbConnect";
 
  process.on("uncaughtException",(err:Error)=>{
    //
    let error:ErrorDataType = {
        msg:"uncaughtException error found",
        stack:err.stack,
        status:"STRONG",
        time:new Date().toDateString()
    }
LogError(error)



  })

  



  //RESPONSE_TYPE
  let port = getEnv("PORT");
   
  startApp(app,<number>port);