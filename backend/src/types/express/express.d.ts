declare global {
    namespace Express {
      interface Request {
        user: {
          [key: string]: any;
        } | JwtPayload;
      }
    }
  }
  
  export {};