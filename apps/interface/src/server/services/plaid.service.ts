import { plaidClient } from "@/server/plaid";

export const createExchangeToken = async (publicToken: string) => {
  const response = await plaidClient.itemPublicTokenExchange({
    public_token: publicToken,
  });

  const { access_token } = response.data;
  return { accessToken: access_token };
};
