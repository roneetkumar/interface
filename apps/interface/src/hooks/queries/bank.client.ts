import { trpc } from "@/server/api/client";

export const useGetBankAccounts = (
  hasAccessToken: boolean | undefined = false,
) => {
  const accounts = trpc.bank.getAccounts.useQuery(undefined, {
    enabled: hasAccessToken,
  });

  return accounts.data;
};
