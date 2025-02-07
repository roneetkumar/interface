import { createTRPCRouter, publicProcedure } from "../../api/trpc";
import { z } from "zod";

export const bankRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { url: `GET /api/bank/${input.name}` };
    }),
});
