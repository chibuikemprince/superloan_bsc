import express, { Application, Request, Response, NextFunction } from 'express';
import { baseMiddleware } from './middlewares/baseMiddleWare';
import { response } from './helpers/misc';
import { RESPONSE_TYPE } from './helpers/customTypes';
import { LogError, ErrorDataType } from './helpers/errorReporting';
import cors from 'cors';
import bodyParser from 'body-parser';
 import auth from './routes/auth';
//routes 
const app: Application = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(baseMiddleware);

//auth
app.use("/api",auth)
  

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;

  let notFoundRes: RESPONSE_TYPE = {
    message: `${fullURL} page not found`,
    data: [],
    status: 404,
    statusCode: 'PAGE_NOT_FOUND',
  };
  response(res, notFoundRes);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  let errorLog: ErrorDataType = {
    msg: 'error found: ',
    stack: error.stack,
    status: 'STRONG',
    time: new Date().toDateString(),
  };
  LogError(errorLog);

  let error_res: RESPONSE_TYPE = {
    message: 'error detected, please try again.',
    data: [],
    status: 500,
    statusCode: 'UNKNOWN_ERROR',
  };
  response(res, error_res);
});

export default app;
