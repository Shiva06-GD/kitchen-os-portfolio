'use client';

import { useEffect } from 'react';
import { useOrderStore } from '@/lib/store';
import { generateRandomOrder } from '@/lib/mock-data';

export function OrderSimulator() {
    const addOrder = useOrderStore((state) => state.addOrder);

    useEffect(() => {
        // Initial population
        addOrder(generateRandomOrder());
        addOrder(generateRandomOrder());

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
