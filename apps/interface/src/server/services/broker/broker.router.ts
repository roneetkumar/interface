import { createTRPCRouter, publicProcedure } from "../../api/trpc";

export const brokerRouter = createTRPCRouter({
    get: publicProcedure.query(() => {
        return { data: 'GET /api/broker' };
    })
});