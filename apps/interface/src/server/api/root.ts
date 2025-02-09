import { bankRouter, brokerRouter, plaidRouter } from "../services";
import { userRouter } from "../services/user/user.router";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  bank: bankRouter,
  broker: brokerRouter,
  plaid: plaidRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
