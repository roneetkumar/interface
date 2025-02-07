import { Client } from "@/components/Client";
import { HydrateClient, trpc } from "@/server/api/server";

export default async function Home() {
  const bank = await trpc.bank.get({ name: 'scotia' });

  return (
    <div className="flex items-center flex-col min-h-screen max-w-[600px] m-auto">
      <h1 className="pt-12 text-center text-6xl mb-4">Hello Interface</h1>
      <div>
        <p>Server: {bank.url}</p>
        <HydrateClient>
          <Client />
        </HydrateClient>
      </div>
    </div >
  );
}