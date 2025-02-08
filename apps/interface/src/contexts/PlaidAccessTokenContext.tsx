"use client";

import { trpc } from "@/server/api/client";
import { createContext, ReactNode, use, useState } from "react";

type PlaidAccessTokenContextType = {
  accessToken: string | null;
  accessTokenGetter: (publicToken: string) => void;
};

export const PlaidAccessTokenContext =
  createContext<PlaidAccessTokenContextType | null>(null);

export const PlaidAccessTokenProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const exchangeTokenMutation = trpc.plaid.createExchangeToken.useMutation();

  const accessTokenGetter = async (publicToken: string) => {
    try {
      const { accessToken } = await exchangeTokenMutation.mutateAsync({
        publicToken,
      });

      setAccessToken(accessToken);
    } catch (error) {
      console.error("Error exchanging public token:", error);
    }
  };

  return (
    <PlaidAccessTokenContext.Provider
      value={{ accessToken, accessTokenGetter }}
    >
      {children}
    </PlaidAccessTokenContext.Provider>
  );
};

export const usePlaidAccessToken = () => {
  const context = use(PlaidAccessTokenContext);

  if (!context) {
    throw new Error(
      "usePlaidAccessToken must be used within a PlaidAccessTokenProvider",
    );
  }

  const { accessToken, accessTokenGetter } = context;
  return { accessToken, accessTokenGetter };
};
