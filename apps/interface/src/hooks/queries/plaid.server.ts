import { trpc } from "@/server/api/server";

export const createPlaidLinkToken = async () => {
  const bank = await trpc.plaid.createLinkToken({
    clientUserId: process.env.PLAID_CLIENT_ID!,
  });

  return bank.linkToken;
};
