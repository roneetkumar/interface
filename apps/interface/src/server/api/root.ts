import { bankRouter, brokerRouter, plaidRouter } from "../services";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  bank: bankRouter,
  broker: brokerRouter,
  plaid: plaidRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
