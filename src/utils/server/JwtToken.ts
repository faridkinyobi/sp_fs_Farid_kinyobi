import jwt from 'jsonwebtoken';

import { type AuthPayload } from '../../lib/interface';
import { config } from '../../config';

export const generateAccessToken = (payload: AuthPayload) => {
  return jwt.sign(payload, config.jwtAccessTokenSecret as jwt.Secret, {
    expiresIn: '1d',
  });
};

export const generateRefreshToken = (payload: AuthPayload) => {
  return jwt.sign(payload, config.jwtRefreshAccessTokenSecret as jwt.Secret, {
    expiresIn: '1s',
  });
};
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.jwtAccessTokenSecret as jwt.Secret);
};
