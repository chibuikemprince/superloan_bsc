import { Response, Request, NextFunction } from 'express';

export const baseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body = { ...req.query, ...req.body };

  if(req.body.hasOwnProperty("start")){

    req.body.start = Number(req.body.start )
  }
  
  if(req.body.hasOwnProperty("stop")){

  req.body.stop = Number(req.body.stop )

  }
  next();
};
