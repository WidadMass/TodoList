import { Request, Response, NextFunction } from 'express';

export const validateRequired = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of fields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `Le champ ${field} est requis`
        });
      }
    }
    next();
  };
};