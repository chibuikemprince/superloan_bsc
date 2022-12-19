"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogError = void 0;
// import Logger from "logger";
// import pino from  'pino'
const path_1 = __importDefault(require("path"));
/* const Pino = pino({
    prettifier:true,
    timestamp:false
    
}); */
const fatalLogPath = path_1.default.resolve(__dirname, '../io/error');
/*
export const LoggerError = (err:ErrorDataType)=>{
   //'fatal', 'error', 'warn', 'info', 'debug'


  let infoLog = Logger.createLogger( )
   let fatalLog = Logger.createLogger(`${fatalLogPath}/fatal.log`)
   let mildLog = Logger.createLogger(`${fatalLogPath}/mild.log`)




let loggerOrder = 'warn';
if(err.status == "STRONG"){
    loggerOrder =  'fatal'
    fatalLog.setLevel('fatal');
    fatalLog.fatal(JSON.stringify(err) as string);
}
else if(err.status == "INFO"){
    loggerOrder =  'info'
    mildLog.setLevel('info');
    infoLog.info(JSON.stringify(err) as string);
}
 else{
    mildLog.setLevel('warn');
    mildLog.warn(JSON.stringify(err) as string);
 }

 //Pino.info(err)

console.error(new Error(err.msg))
//console.log(err);
return;

}

 */
const LogError = (err) => {
    //'fatal', 'error', 'warn', 'info', 'debug'
    let loggerOrder = 'warn';
    if (err.status == 'STRONG') {
        loggerOrder = 'fatal';
    }
    else if (err.status == 'INFO') {
        loggerOrder = 'info';
    }
    //Pino.info(err)
    //console.error(new Error(err.msg))
    console.log(err);
    return;
};
exports.LogError = LogError;
