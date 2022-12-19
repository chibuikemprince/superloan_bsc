import mongoose from 'mongoose';
import { getEnv } from './env';
import express, { Application } from 'express';
import { ErrorDataType, LogError } from './errorReporting';

var DBURI: string = getEnv('DB') as string;
if (process.env.APP_ENV == 'production') {
  DBURI = getEnv('DB_PRODUCTION') as string;
}
console.log({ DBURI, env: process.env.APP_ENV });
export const startApp = (app: Application, port: number) => {
  mongoose
    .connect(<string>DBURI)
    .then((start) => {
      app.listen(port, () => {
        console.log({
          message: 'App is now running.',
          port,
          DBURI,
        });
      });
    })
    .catch((err) => {
      let myerr: ErrorDataType = {
        msg: 'Error found, app could not start',
        stack: err.stack,
        status: 'STRONG',
        time: new Date().toDateString(),
      };

      console.log({ myerr });
    });
};
