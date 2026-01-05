'use client';

import { useOrderStore } from '@/lib/store';
import { KDSCard } from '@/components/kds/KDSCard';

export default function KDSPage() {
    const orders = useOrderStore((state) => state.orders);

    // KDS shows all active orders regardless of status (except dispatched usually, but maybe keep them for a bit? No, clear them)
    const activeOrders = orders.filter(o => o.status !== 'Dispatched').sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // FIFO

    return (
        <div className="min-h-screen bg-background p-4">
            <header className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-3xl font-bold text-primary tracking-tight">KITCHEN DISPLAY SYSTEM</h1>
                <div className="text-xl font-mono bg-secondary px-4 py-2 rounded-md">
                    Active: <span className="font-bold">{activeOrders.length}</span>
                </div>
            </header>

            {activeOrders.length === 0 ? (
                <div className="flex h-[60vh] items-center justify-center text-muted-foreground text-2xl animate-pulse">
                    Waiting for orders...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {activeOrders.map((order) => (
                        <KDSCard key={order.id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
}
