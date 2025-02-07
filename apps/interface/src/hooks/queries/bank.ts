import { trpc } from "@/server/api/client";

export const useGetBankAccounts = (accessToken?: string) => {
  return trpc.bank.getAccounts.useQuery(
    { accessToken: accessToken! },
    { enabled: !!accessToken },
  ).data;
};
