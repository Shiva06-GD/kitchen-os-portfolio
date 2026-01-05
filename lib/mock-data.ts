import { Order, OrderItem, Aggregator } from './types';

const MENU_ITEMS = [
    { name: 'Butter Chicken', price: 350 },
    { name: 'Paneer Tikka', price: 280 },
    { name: 'Dal Makhani', price: 220 },
    { name: 'Garlic Naan', price: 40 },
    { name: 'Chicken Biryani', price: 400 },
    { name: 'Coca Cola', price: 60 },
];

const CUSTOMIZATIONS = ['Spicy', 'Less Oil', 'Extra Cheese', 'No Onions', ''];
const NAMES = ['Rahul', 'Ankit', 'Priya', 'Sneha', 'Vikram', 'Amit', 'Rohit', 'Neha'];

export const generateRandomOrder = (): Order => {
    const itemCount = Math.floor(Math.random() * 3) + 1;
    const items: OrderItem[] = [];
    let totalAmount = 0;

    for (let i = 0; i < itemCount; i++) {
        const menuItm = MENU_ITEMS[Math.floor(Math.random() * MENU_ITEMS.length)];
        const qty = Math.floor(Math.random() * 2) + 1;
        totalAmount += menuItm.price * qty;
        items.push({
            id: Math.random().toString(36).substr(2, 9),
            name: menuItm.name,
            quantity: qty,
            customization: CUSTOMIZATIONS[Math.floor(Math.random() * CUSTOMIZATIONS.length)],
        });
    }

    const aggregators: Aggregator[] = ['Zomato', 'Swiggy', 'UberEats'];

    return {
        id: `ORD-${Math.floor(Math.random() * 10000)}`,
        customerName: NAMES[Math.floor(Math.random() * NAMES.length)],
        aggregator: aggregators[Math.floor(Math.random() * aggregators.length)],
        items,
        status: 'New',
        createdAt: new Date(),
        totalAmount,
    };
};
