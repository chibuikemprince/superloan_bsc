import { env } from '../../env';
import { LogError, ErrorDataType } from './errorReporting';

/*

process.env = {
...process.env, ...env
} 

*/

export type getEnvType = { (key: string): string | number };

export const getEnv = (key: string): string | number => {
  key = key.toUpperCase();
  if (env[key] == undefined) {
    //throw new Error(`${key} is not defined`)
    let err: ErrorDataType = {
      msg: `${key} is not defined`,
      status: 'WEAK',
      time: new Date().toDateString(),
    };

    LogError(err);
  }

  // console.log(isNaN(<number><unknown>env[key]))
  //console.log(   <unknown>Number(env[key]) as string != <unknown>NaN.toString(), Number(env[key]) )
  return Number(env[key]) != undefined && !isNaN(<number>(<unknown>env[key]))
    ? Number(env[key])
    : env[key];
  //return env[key]? env[key]:"";
};
