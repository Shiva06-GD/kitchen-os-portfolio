'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from 'lucide-react'; // Mocking switch with a button/icon for now or just Button

// Mock menu data matching the generator
const INITIAL_MENU = [
    { id: '1', name: 'Butter Chicken', price: 350, category: 'Main Course', inStock: true },
    { id: '2', name: 'Paneer Tikka', price: 280, category: 'Starters', inStock: true },
    { id: '3', name: 'Dal Makhani', price: 220, category: 'Main Course', inStock: true },
    { id: '4', name: 'Garlic Naan', price: 40, category: 'Breads', inStock: true },
    { id: '5', name: 'Chicken Biryani', price: 400, category: 'Rice', inStock: true },
    { id: '6', name: 'Coca Cola', price: 60, category: 'Beverages', inStock: true },
];

export default function MenuPage() {
    const [menu, setMenu] = useState(INITIAL_MENU);

    const toggleStock = (id: string) => {
        setMenu(menu.map(item =>
            item.id === id ? { ...item, inStock: !item.inStock } : item
        ));
    };

    return (
        <div className="h-full">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Menu Management</h1>
                <Button>Add New Item</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menu.map((item) => (
                    <Card key={item.id} className={!item.inStock ? 'opacity-60 bg-muted' : ''}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-medium">
                                {item.name}
                            </CardTitle>
                            <Badge variant={item.inStock ? 'default' : 'destructive'}>
                                {item.inStock ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mt-2">
                                <div className="text-2xl font-bold">₹{item.price}</div>
                                <Button
                                    variant={item.inStock ? "destructive" : "default"}
                                    size="sm"
                                    onClick={() => toggleStock(item.id)}
                                >
                                    {item.inStock ? 'Mark Unavailable' : 'Mark Available'}
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">{item.category}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
