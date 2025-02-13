import { trpc } from "@/server/api/client";
import { useGetUser } from "./user.client";

export const useGetBankAccounts = () => {
  const user = useGetUser();

  const accounts = trpc.bank.getAccounts.useQuery(undefined, {
    enabled: !!user?.hasAccessToken,
  });

  return accounts.data;
};
