import { db } from "@/db/db";
import { createTRPCRouter, publicProcedure } from "../../api/trpc";
import { users } from "drizzle/schema";

export const brokerRouter = createTRPCRouter({
    get: publicProcedure.query(async () => {
        const usersData = await db.select().from(users)
        return usersData;
    })
});
