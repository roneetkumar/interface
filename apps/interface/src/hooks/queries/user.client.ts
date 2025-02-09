import { trpc } from "@/server/api/client";

export const useUpdateAccessToken = () => {
  const updateAccessToken = trpc.user.updatePlaidAccessToken.useMutation();

  const trpcUtils = trpc.useUtils();

  const accessTokenGetter = async (publicString: string) => {
    await updateAccessToken.mutateAsync(
      { publicToken: publicString },
      {
        onSuccess: () => {
          trpcUtils.bank.getAccounts.invalidate();
          trpcUtils.user.getUser.invalidate();
        },
      },
    );
  };

  return { accessTokenGetter };
};

export const useGetUser = () => {
  const users = trpc.user.getUser.useQuery();

  return users.data;
};
