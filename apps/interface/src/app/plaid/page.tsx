import { BankAccounts } from "@/components/BankAccounts";
import { PlaidClient } from "@/components/PlaidClient";
import { createPlaidLinkToken } from "@/hooks/queries/plaid.server";
import { HydrateClient, trpc } from "@/server/api/server";

export default async function Home() {
  const linkToken = await createPlaidLinkToken();

  await trpc.user.getUser.prefetch();
  await trpc.bank.getAccounts.prefetch();

  return (
    <div className="flex items-center flex-col min-h-screen max-w-[800px] m-auto">
      <h1 className="text-center text-6xl py-6">Hello Plaid</h1>
      <PlaidClient token={linkToken} />

      <br />
      <hr />
      <br />

      <HydrateClient>
        <BankAccounts />
      </HydrateClient>
    </div>
  );
}
