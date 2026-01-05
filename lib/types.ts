export type Aggregator = 'Zomato' | 'Swiggy' | 'UberEats';
export type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'Dispatched';

export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    customization?: string;
}

export interface Order {
    id: string;
    customerName: string;
    aggregator: Aggregator;
    items: OrderItem[];
    status: OrderStatus;
    createdAt: Date;
    totalAmount: number;
}

export interface Metrics {
    activeOrders: number;
    revenueToday: number;
    avgPrepTime: number; // in minutes
}
