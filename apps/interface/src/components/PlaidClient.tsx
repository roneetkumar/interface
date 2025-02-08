"use client";

import { useGetBankAccounts } from "@/hooks/queries/bank.client";
import { PlaidLinkButton } from "./PlaidLinkButton";
import { usePlaidAccessToken } from "@/contexts/PlaidAccessTokenContext";

export const PlaidClient = ({ token }: { token: string }) => {
  const { accessToken, accessTokenGetter } = usePlaidAccessToken();

  const bankAccounts = useGetBankAccounts(accessToken);

  return (
    <div className="w-full">
      <div className="flex gap-4 items-center">
        <h3>Want to sync you back ?</h3>
        {token && (
          <PlaidLinkButton onSuccess={accessTokenGetter} token={token}>
            Connect Plaid
          </PlaidLinkButton>
        )}
      </div>

      <br />

      <hr />

      <br />
      <h1>Your bank data : {!bankAccounts && "N/A"}</h1>
      {bankAccounts && (
        <pre className="border p-3 mt-2 rounded-md max-h-[400px] overflow-y-auto">
          {JSON.stringify(bankAccounts, null, 2)}
        </pre>
      )}
    </div>
  );
};
