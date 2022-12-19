import express, { Application, Request, Response, NextFunction } from 'express';
import { baseMiddleware } from './middlewares/baseMiddleWare';
import { response } from './helpers/misc';
import { RESPONSE_TYPE } from './helpers/customTypes';
import { LogError, ErrorDataType } from './helpers/errorReporting';
import cors from 'cors';
import bodyParser from 'body-parser';
 import auth from './routes/auth';
 import LoanRoute from './routes/loan';
//routes 
const app: Application = express();

app.use(
  cors({
    origin: '*',
    /* [
  "http://localhost",
  "http://localhost:3000", 
  
  ] */

    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    maxAge: 1000,
    credentials: true,
    allowedHeaders:
      'Access-Control-Allow-Headers, Content-Type,Authorization,content-type, X-Requested-With,token',
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(baseMiddleware);

//auth
app.use("/api",auth)
  
//loan
app.use("/api",LoanRoute)


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
