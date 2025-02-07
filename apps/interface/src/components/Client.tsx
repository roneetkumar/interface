'use client';

import { trpc } from "@/server/api/client";

export const Client = () => {
    const broker = trpc.broker.get.useQuery();

    if (broker.isLoading) {
        return <div>Broker Loading...</div>;
    }

    if (!broker.data) {
        return <div>Broker No Data</div>;
    }

    return (
        <div className="flex flex-col min-h-screen max-w-[600px] m-auto">
            <h1>Users</h1>
            <ul>
                {broker.data?.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}