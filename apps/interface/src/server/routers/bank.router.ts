import { USER_ID } from "@/server/contants";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../api/trpc";
import { plaidClient } from "../plaid";
import { getPlaidAccessToken } from "../services/user.service";

export const bankRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { url: `GET /api/bank/${input.name}` };
    }),

  getAccounts: publicProcedure.query(async () => {
    try {
      const { accessToken } = await getPlaidAccessToken(USER_ID);

      if (!accessToken) {
        throw new TRPCError({
          message: "Access token not found",
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      const response = await plaidClient.accountsGet({
        access_token: accessToken,
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
