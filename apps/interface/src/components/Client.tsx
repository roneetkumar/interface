'use client';

import { trpc } from "@/server/api/client";

export const Client = () => {
    const bank = trpc.bank.get.useQuery({ name: 'td' });

    if (bank.error) {
        return <div>{bank.error.message}</div>;
    }

    if (bank.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <p>
            {bank.data?.url}
        </p>
    );
}