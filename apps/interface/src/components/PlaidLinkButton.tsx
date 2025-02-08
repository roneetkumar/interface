import { usePlaidLink } from "react-plaid-link";

type PlaidLinkButtonProps = {
  token: string;
  onSuccess: (publicToken: string) => void;
  children: string;
};

export const PlaidLinkButton = ({
  token,
  onSuccess,
  children,
}: PlaidLinkButtonProps) => {
  const { open, ready } = usePlaidLink({
    token: token!,
    onSuccess,
  });

  return (
    <button
      className="bg-slate-500 text-white text-xs font-bold rounded-md px-3 py-2"
      onClick={() => open()}
      disabled={!ready}
    >
      {children}
    </button>
  );
};
