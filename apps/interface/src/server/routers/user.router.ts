import { createTRPCRouter, publicProcedure } from "../api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { db } from "@/server/db";
import { users } from "drizzle/schema";
import { eq } from "drizzle-orm";
import { createExchangeToken } from "../services/plaid.service";

const USER_ID = 1;
export const userRouter = createTRPCRouter({
  updatePlaidAccessToken: publicProcedure
    .input(z.object({ publicToken: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const { accessToken } = await createExchangeToken(input.publicToken);

        await db
          .update(users)
          .set({
            accessToken,
          })
          .where(eq(users.id, USER_ID));
      } catch (error) {
        throw new TRPCError({
          message: "Error while updating access token",
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
        });
      }
    }),

  getPlaidAccessToken: publicProcedure.query(async () => {
    const dbResponse = await db
      .select({ accessToken: users.accessToken })
      .from(users)
      .where(eq(users.id, USER_ID));

    const [accessToken] = dbResponse;

    return accessToken;
  }),

  getUser: publicProcedure.query(async () => {
    const dbResponse = await db
      .select()
      .from(users)
      .where(eq(users.id, USER_ID));

    const [user] = dbResponse;
    const { accessToken, ...restFields } = user;

    return {
      ...restFields,
      hasAccessToken: !!accessToken,
    };
  }),
});
