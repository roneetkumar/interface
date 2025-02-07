import { usePlaidLink } from "react-plaid-link";

export const PlaidLinkButton = ({
  token,
  onSuccess,
  children,
}: {
  token: string;
  onSuccess: (publicToken: string) => void;
  children: string;
}) => {
  const { open, ready } = usePlaidLink({
    token: token!,
    onSuccess,
  });

  return (
    <button onClick={() => open()} disabled={!ready}>
      {children}
    </button>
  );
};
