import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { users } from "drizzle/schema";

export const getPlaidAccessToken = async (userId: number) => {
  const dbResponse = await db
    .select({ accessToken: users.accessToken })
    .from(users)
    .where(eq(users.id, userId));

  const [accessToken] = dbResponse;

  return accessToken;
};
