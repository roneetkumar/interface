import { db } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { users } from "@/server/db/schema";

export const brokerRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const usersData = await db.select().from(users);
    return usersData;
  }),
});
