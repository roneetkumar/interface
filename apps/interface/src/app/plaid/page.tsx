import { PlaidClient } from "@/components/PlaidClient";
import { PlaidAccessTokenProvider } from "@/contexts/PlaidAccessTokenContext";
import { createPlaidLinkToken } from "@/hooks/queries/plaid.server";

export default async function Home() {
  const linkToken = await createPlaidLinkToken();

  return (
    <div className="flex items-center flex-col min-h-screen max-w-[800px] m-auto">
      <h1 className="text-center text-6xl py-6">Hello Plaid</h1>
      <PlaidAccessTokenProvider>
        <PlaidClient token={linkToken} />
      </PlaidAccessTokenProvider>
    </div>
  );
}
