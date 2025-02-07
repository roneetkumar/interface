"use client";

import { trpc } from "@/server/api/client";
import { useState } from "react";
import { usePlaidLink } from "react-plaid-link";

export const Client = ({ token }: { token: string }) => {
  const [accessToken, setAccessToken] = useState<string>();

  const exchangeTokenMutation = trpc.plaid.createExchangeToken.useMutation();

  const bankAccounts = trpc.bank.getAccounts.useQuery(
    { accessToken: accessToken! },
    { enabled: !!accessToken },
  );

  const onSuccess = async (public_token: string) => {
    try {
      const data = await exchangeTokenMutation.mutateAsync({
        publicToken: public_token,
      });

      setAccessToken(data.accessToken);
    } catch (error) {
      console.error("Error exchanging public token:", error);
    }
  };

  const { open, ready } = usePlaidLink({
    token: token!,
    onSuccess,
  });

  console.log(JSON.stringify(bankAccounts.data, null, 2));

  return (
    <div className="flex flex-col min-h-screen max-w-[600px] m-auto">
      <h1>Users</h1>

      {token && (
        <button onClick={() => open()} disabled={!ready}>
          Connect Bank
        </button>
      )}
    </div>
  );
};
