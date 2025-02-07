import { Client } from "@/components/Client";
import { createPlaidLinkToken } from "@/hooks/queries/plaid";

export default async function Home() {
  const linkToken = await createPlaidLinkToken();

  return (
    <div className="flex items-center flex-col min-h-screen max-w-[600px] m-auto">
      <h1 className="pt-12 text-center text-6xl mb-4">Hello Interface</h1>
      <div>
        <Client token={linkToken} />
      </div>
    </div>
  );
}
