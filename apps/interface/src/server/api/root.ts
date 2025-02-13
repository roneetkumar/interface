import { bankRouter } from "./routers/bank.router";
import { brokerRouter } from "./routers/broker.router";
import { plaidRouter } from "./routers/plaid.router";
import { userRouter } from "./routers/user.router";
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
