"use client";

import { useGetBankAccounts } from "@/hooks/queries/bank.client";
import { PlaidLinkButton } from "./PlaidLinkButton";
import { useUpdateAccessToken, useGetUser } from "@/hooks/queries/user.client";

type PlaidClientProps = {
  token: string;
};

export const PlaidClient = ({ token }: PlaidClientProps) => {
  const { accessTokenGetter } = useUpdateAccessToken();

  const user = useGetUser();

  const bankAccounts = useGetBankAccounts(user?.hasAccessToken);

  return (
    <div className="w-full">
      {!bankAccounts && (
        <>
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
        </>
      )}

      <h1>Your bank data : {!bankAccounts && "N/A"}</h1>
      {bankAccounts && (
        <pre className="border p-3 mt-2 rounded-md max-h-[400px] overflow-y-auto">
          {JSON.stringify(bankAccounts, null, 2)}
        </pre>
      )}
    </div>
  );
};
