import { createTRPCRouter, publicProcedure } from "../../api/trpc";
import { z } from "zod";
import { plaidClient } from "../plaid";
import { TRPCError } from "@trpc/server";

export const bankRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { url: `GET /api/bank/${input.name}` };
    }),

  getAccounts: publicProcedure
    .input(z.object({ accessToken: z.string() }))
    .query(async ({ input }) => {
      try {
        const response = await plaidClient.accountsGet({
          access_token: input.accessToken,
        });
        return response.data;
      } catch (error) {
        throw new TRPCError({
          message: "Error fetching accounts",
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
        });
      }
    }),
});
