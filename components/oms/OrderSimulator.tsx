'use client';

import { useEffect } from 'react';
import { useOrderStore } from '@/lib/store';
import { generateRandomOrder } from '@/lib/mock-data';

export function OrderSimulator() {
    const addOrder = useOrderStore((state) => state.addOrder);

    useEffect(() => {
        // Initial population
        // Standard orders
        addOrder(generateRandomOrder());
        addOrder(generateRandomOrder());

        // FORCE EXCEPTION SCENARIOS (SLA Testing)
        // 1. Late Order (> 15 mins)
        const lateOrder = generateRandomOrder();
        lateOrder.status = 'Preparing';
        lateOrder.createdAt = new Date(Date.now() - 18 * 60 * 1000); // 18 mins ago
        addOrder(lateOrder);

        // 2. Critical Order (> 25 mins)
        const criticalOrder = generateRandomOrder();
        criticalOrder.status = 'Preparing';
        criticalOrder.createdAt = new Date(Date.now() - 28 * 60 * 1000); // 28 mins ago
        addOrder(criticalOrder);

        // Interval simulation
        const interval = setInterval(() => {
            // 50% chance to add an order simulating "randomness"
            if (Math.random() > 0.0) { // Make it frequent for demo
                addOrder(generateRandomOrder());
            }
        }, 10000); // 10 seconds

        return () => clearInterval(interval);
    }, [addOrder]);

    return null;
}
