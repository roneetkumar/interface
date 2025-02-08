import { trpc } from "@/server/api/client";

export const useGetBankAccounts = (accessToken: string | null) => {
  const accounts = trpc.bank.getAccounts.useQuery(
    { accessToken: accessToken! },
    { enabled: !!accessToken },
  );

  return accounts.data;
};
