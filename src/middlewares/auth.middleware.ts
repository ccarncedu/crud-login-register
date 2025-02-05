import { Request } from 'express';
import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateJWT = expressjwt({
  secret: process.env.JWT_SECRET!,
  algorithms: ['HS256'],
  requestProperty: 'auth',
  getToken: (req: Request) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return undefined;
  }
});