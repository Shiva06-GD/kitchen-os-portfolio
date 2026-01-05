'use client';

import { Order, OrderStatus } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Truck, Utensils, MoveRight } from 'lucide-react';
import { useOrderStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';

interface OrderCardProps {
    order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: order.id,
        data: { order },
    });
    const updateStatus = useOrderStore((state) => state.updateOrderStatus);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const updateTime = () => {
            const diff = Math.floor((new Date().getTime() - new Date(order.createdAt).getTime()) / 1000 / 60);
            setElapsed(diff);
        };
        updateTime();
        const interval = setInterval(updateTime, 60000); // 1 min update
        return () => clearInterval(interval);
    }, [order.createdAt]);

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    const getAggregatorColor = (agg: string) => {
        switch (agg) {
            case 'Zomato': return 'bg-red-600 text-white hover:bg-red-700 border-none';
            case 'Swiggy': return 'bg-orange-500 text-white hover:bg-orange-600 border-none';
            case 'UberEats': return 'bg-green-600 text-white hover:bg-green-700 border-none';
            default: return 'bg-slate-700 text-white';
        }
    };

    const nextStatus: Record<OrderStatus, OrderStatus | null> = {
        'New': 'Preparing',
        'Preparing': 'Ready',
        'Ready': 'Dispatched',
        'Dispatched': null,
    };

    const handleNext = () => {
        const next = nextStatus[order.status];
        if (next) updateStatus(order.id, next);
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="mb-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow relative"
        >
            <CardHeader className="p-4 pb-2 flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <Badge className={cn("rounded-sm px-1.5", getAggregatorColor(order.aggregator))}>
                        {order.aggregator}
                    </Badge>
                    <span className="font-mono font-bold text-sm">#{order.id.split('-')[1]}</span>
                </div>
                <div className={cn("text-xs font-bold flex items-center gap-1", elapsed > 15 ? 'text-red-500' : 'text-muted-foreground')}>
                    <Clock className="h-3 w-3" />
                    {elapsed}m
                </div>
            </CardHeader>
            <CardContent className="p-4 text-sm space-y-2">
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                    <span>{order.customerName}</span>
                    <span>₹{order.totalAmount}</span>
                </div>
                <ul className="space-y-1">
                    {order.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-start">
                            <span>{item.quantity}x {item.name}</span>
                            {item.customization && <span className="text-[10px] text-muted-foreground italic ml-2">{item.customization}</span>}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="p-2 bg-muted/30 flex justify-between">
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 text-xs w-full hover:bg-slate-800 hover:text-white transition-colors"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                    }}
                >
                    {order.status !== 'Dispatched' ? 'Next Status' : 'Completed'}
                    {order.status !== 'Dispatched' && <MoveRight className="h-3 w-3 ml-2" />}
                </Button>
            </CardFooter>
        </Card>
    );
}
