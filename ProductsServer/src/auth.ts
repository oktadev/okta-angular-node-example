import { Request, Response, NextFunction } from 'express';
import {ConfigOKTA} from './.env.server';

const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  ...ConfigOKTA
});

export async function oktaAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = (req as any).token;
    if (!token) {
      return res.status(401).send('Not Authorised');
    }
    const jwt = await oktaJwtVerifier.verifyAccessToken(token);
    req["user"] = {
      uid: jwt.claims.uid,
      email: jwt.claims.sub
    };
    next();
  }
  catch (err) {
    return res.status(401).send(err.message);
  }
}
