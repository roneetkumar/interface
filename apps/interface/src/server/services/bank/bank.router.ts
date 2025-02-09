import { createTRPCRouter, publicProcedure } from "../../api/trpc";
import { z } from "zod";
import { plaidClient } from "../plaid";
import { TRPCError } from "@trpc/server";
import { getPlaidAccessToken } from "../user/user.service";
import { USER_ID } from "@/server/contants";

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
