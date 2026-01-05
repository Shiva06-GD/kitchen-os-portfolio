import { create } from 'zustand';
import { Order, OrderStatus, Metrics } from './types';

interface OrderState {
    orders: Order[];
    metrics: Metrics;
    addOrder: (order: Order) => void;
    updateOrderStatus: (orderId: string, status: OrderStatus) => void;
    initializeOrders: (orders: Order[]) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    orders: [],
    metrics: {
        activeOrders: 0,
        revenueToday: 0,
        avgPrepTime: 12, // mock baseline
    },
    addOrder: (order) =>
        set((state) => {
            const newOrders = [...state.orders, order];
            // Recalculate active orders
            const activeCount = newOrders.filter((o) => o.status === 'New' || o.status === 'Preparing').length;

            // Recalculate revenue just in case initial state has completed orders
            const newRevenue = newOrders.reduce((acc, o) => {
                if (o.status === 'Ready' || o.status === 'Dispatched') {
                    return acc + o.totalAmount;
                }
                return acc;
            }, 0);

            return {
                orders: newOrders,
                metrics: { ...state.metrics, activeOrders: activeCount, revenueToday: newRevenue },
            };
        }),
    updateOrderStatus: (orderId, status) =>
        set((state) => {
            const newOrders = state.orders.map((o) =>
                o.id === orderId ? { ...o, status } : o
            );

            // Recalculate metrics dynamically
            // Revenue: 'Ready' or 'Dispatched' counts
            const newRevenue = newOrders.reduce((acc, o) => {
                if (o.status === 'Ready' || o.status === 'Dispatched') {
                    return acc + o.totalAmount;
                }
                return acc;
            }, 0);

            // Active: 'New' or 'Preparing' only
            const activeCount = newOrders.filter((o) => o.status === 'New' || o.status === 'Preparing').length;

            return {
                orders: newOrders,
                metrics: {
                    ...state.metrics,
                    activeOrders: activeCount,
                    revenueToday: newRevenue,
                },
            };
        }),
    initializeOrders: (orders) => set({ orders }),
}));
