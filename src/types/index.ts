import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

export type ModifiedApiRequest = NextApiRequest & {
  jwt?: { [key: string]: any };
};

export type Handler = ((
  req: ModifiedApiRequest,
  res: NextApiResponse
) => Promise) & { withMiddlewares?: WithMiddlewares; (): Promise };

export type Middleware = (handler: Handler) => Handler;

export type MiddlewareCreator = <T extends unknown[]>(...args: T) => Middleware;

export type WithMiddlewares = (...middlewares: Middleware[]) => Handler;

export type Model<
  S,
  TQueryHelpers = {},
  TMethodsAndOverrides = {},
  TVirtuals = {}
> = mongoose.Model<any, TQueryHelpers, TMethodsAndOverrides, TVirtuals, S>;
