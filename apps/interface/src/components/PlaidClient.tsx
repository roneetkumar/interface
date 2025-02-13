"use client";

import { PlaidLinkButton } from "./PlaidLinkButton";
import { useUpdateAccessToken } from "@/hooks/queries/user.client";

type PlaidClientProps = {
  token: string;
};

export const PlaidClient = ({ token }: PlaidClientProps) => {
  const { accessTokenGetter } = useUpdateAccessToken();

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
    </div>
  );
};
