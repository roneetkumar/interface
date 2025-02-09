import { createTRPCRouter, publicProcedure } from "../api/trpc";
import { z } from "zod";

import { Products, CountryCode } from "plaid";
import { TRPCError } from "@trpc/server";
import { plaidClient } from "../plaid";

export const plaidRouter = createTRPCRouter({
  createLinkToken: publicProcedure
    .input(z.object({ clientUserId: z.string() }))
    .query(async ({ input }) => {
      try {
        const response = await plaidClient.linkTokenCreate({
          user: { client_user_id: input.clientUserId },
          client_name: "Name your App",
          products: [Products.Auth, Products.Transactions],
          country_codes: [CountryCode.Ca],
          language: "en",
        });
        return { linkToken: response.data.link_token };
      } catch (error) {
        throw new TRPCError({
          message: "Error generating link token",
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
        });
      }
    }),

  createExchangeToken: publicProcedure
    .input(z.object({ publicToken: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const response = await plaidClient.itemPublicTokenExchange({
          public_token: input.publicToken,
        });
        const { access_token } = response.data;
        return { accessToken: access_token };
      } catch (error) {
        throw new TRPCError({
          message: "Error exchanging public token",
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
        });
      }
    }),
});
