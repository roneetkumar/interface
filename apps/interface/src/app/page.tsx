import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex items-center flex-col min-h-screen max-w-[600px] m-auto">
      <h1 className="pt-12 text-center text-6xl mb-4">Hello Interface</h1>
      <nav>
        <ul className="flex space-x-4">
          <Link href="/plaid">
            <li>Connect Bank</li>
          </Link>
          <li>About Us</li>
        </ul>
      </nav>
    </div>
  );
}
