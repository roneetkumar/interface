"use client";

import { useGetBankAccounts } from "@/hooks/queries/bank.client";

export const BankAccounts = () => {
  const bankAccounts = useGetBankAccounts();

  return (
    <div className="w-full">
      <h1>Your bank data : {!bankAccounts && "N/A"}</h1>
      {bankAccounts && (
        <pre className="border p-3 mt-2 rounded-md max-h-[400px] overflow-y-auto">
          {JSON.stringify(bankAccounts, null, 2)}
        </pre>
      )}
    </div>
  );
};
