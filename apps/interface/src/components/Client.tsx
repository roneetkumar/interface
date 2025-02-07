"use client";

import { useGetBankAccounts } from "@/hooks/queries/bank";
import { PlaidLinkButton } from "./PlaidLinkButton";
import { usePlaidAccessToken } from "@/hooks/custom-hooks/usePlaidAccessToken";

export const Client = ({ token }: { token: string }) => {
  const { accessToken, onSuccess } = usePlaidAccessToken();

  const bankAccounts = useGetBankAccounts(accessToken);

  return (
    <div className="flex flex-col min-h-screen max-w-[600px] m-auto">
      {token && (
        <PlaidLinkButton onSuccess={onSuccess} token={token}>
          Connect Plaid
        </PlaidLinkButton>
      )}

      <br />
      <hr />
      <br />
      <h1>bank data :</h1>
      <pre>{JSON.stringify(bankAccounts, null, 2)}</pre>
    </div>
  );
};
