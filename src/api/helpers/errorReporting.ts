// import Logger from "logger";
// import pino from  'pino'
import path from 'path';

/* const Pino = pino({
    prettifier:true,
    timestamp:false
    
}); */
const fatalLogPath = path.resolve(__dirname, '../io/error');

export type ErrorDataType = {
  msg: string;
  file?: string;
  stack?: string;
  class?: string;
  time: string;
  user?: string;
  admin?: string;
  status: 'STRONG' | 'MILD' | 'WEAK' | 'INFO';
};

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

export const LogError = (err: ErrorDataType) => {
  //'fatal', 'error', 'warn', 'info', 'debug'
  let loggerOrder = 'warn';
  if (err.status == 'STRONG') {
    loggerOrder = 'fatal';
  } else if (err.status == 'INFO') {
    loggerOrder = 'info';
  }
  //Pino.info(err)

  //console.error(new Error(err.msg))
  console.log(err);
  return;
};
