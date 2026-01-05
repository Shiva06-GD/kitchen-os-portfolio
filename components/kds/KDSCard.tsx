'use client';

import { Order, OrderStatus } from '@/lib/types';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOrderStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface KDSCardProps {
    order: Order;
}

export function KDSCard({ order }: KDSCardProps) {
    const updateStatus = useOrderStore((state) => state.updateOrderStatus);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const updateTime = () => {
            const diff = Math.floor((new Date().getTime() - new Date(order.createdAt).getTime()) / 1000 / 60);
            setElapsed(diff);
        };
        updateTime();
        const interval = setInterval(updateTime, 10000); // 10s update for precision
        return () => clearInterval(interval);
    }, [order.createdAt]);

    // Color Logic
    let timerColor = 'text-green-500';
    let borderColor = 'border-l-4 border-l-green-500';

    if (elapsed >= 5 && elapsed < 10) {
        timerColor = 'text-yellow-500';
        borderColor = 'border-l-4 border-l-yellow-500';
    } else if (elapsed >= 10) {
        timerColor = 'text-red-500 animate-pulse';
        borderColor = 'border-l-4 border-l-red-500';
    }

    const handleBump = () => {
        if (order.status === 'New') updateStatus(order.id, 'Preparing');
        else if (order.status === 'Preparing') updateStatus(order.id, 'Ready');
        else if (order.status === 'Ready') updateStatus(order.id, 'Dispatched');
    };

    // Aggregator Color Logic
    const getAggregatorColor = (agg: string) => {
        switch (agg) {
            case 'Zomato': return 'bg-red-600 text-white hover:bg-red-700 border-none';
            case 'Swiggy': return 'bg-orange-500 text-white hover:bg-orange-600 border-none';
            case 'UberEats': return 'bg-green-600 text-white hover:bg-green-700 border-none';
            default: return 'bg-slate-700 text-white';
        }
    };

    if (order.status === 'Dispatched') return null;

    return (
        <Card className={cn("h-full flex flex-col shadow-md", borderColor)}>
            <CardHeader className="p-4 bg-secondary/20 pb-2 flex-row justify-between items-start space-y-0">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold font-mono">#{order.id.split('-')[1]}</h3>
                    <Badge className={cn("rounded-sm px-1.5 w-fit", getAggregatorColor(order.aggregator))}>
                        {order.aggregator}
                    </Badge>
                </div>
                <div className={cn("text-2xl font-bold", timerColor)}>
                    {elapsed}m
                </div>
            </CardHeader>
            <CardContent className="p-4 flex-1">
                <div className="space-y-3">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex flex-col border-b pb-2 last:border-0 last:pb-0">
                            <div className="flex justify-between items-baseline">
                                <span className="text-lg font-semibold">{item.quantity}x {item.name}</span>
                            </div>
                            {item.customization && (
                                <span className="text-sm text-yellow-500 font-medium">NOTE: {item.customization}</span>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="p-4 bg-muted/20">
                <Button
                    size="lg"
                    className="w-full text-lg h-12"
                    onClick={handleBump}
                    variant={order.status === 'Ready' ? 'default' : 'secondary'}
                >
                    {order.status === 'New' && 'Start Prep'}
                    {order.status === 'Preparing' && 'Mark Ready'}
                    {order.status === 'Ready' && 'Dispatch'}
                </Button>
            </CardFooter>
        </Card>
    );
}
