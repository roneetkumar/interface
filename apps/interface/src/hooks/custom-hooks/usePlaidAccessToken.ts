import { trpc } from "@/server/api/client";
import { useState } from "react";

export const usePlaidAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string>();

  const exchangeTokenMutation = trpc.plaid.createExchangeToken.useMutation();

  const onSuccess = async (publicToken: string) => {
    try {
      const { accessToken } = await exchangeTokenMutation.mutateAsync({
        publicToken,
      });

      setAccessToken(accessToken);
    } catch (error) {
      console.error("Error exchanging public token:", error);
    }
  };

  return { onSuccess, accessToken };
};
