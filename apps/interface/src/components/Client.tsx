'use client';

import { trpc } from "@/server/api/client";

export const Client = () => {
    const bank = trpc.bank.get.useQuery({ name: 'td' });
    console.log({ bank });

    if (bank.isLoading) {
        return <div>Loading...</div>;
    }
    if (!bank.data) {
        return <div>No Data</div>;
    }

    return (
        <p>
            Client: {bank.data.url}
        </p>
    );
}