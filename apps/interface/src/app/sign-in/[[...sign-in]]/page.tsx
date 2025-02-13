import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center flex-col min-h-screen max-w-[800px] m-auto">
      <SignIn />
    </div>
  );
}
