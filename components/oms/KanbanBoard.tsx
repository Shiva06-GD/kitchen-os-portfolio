'use client';

import { useOrderStore } from '@/lib/store';
import { OrderCard } from './OrderCard';
import { OrderStatus } from '@/lib/types';
import { DndContext, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const COLUMNS: OrderStatus[] = ['New', 'Preparing', 'Ready', 'Dispatched'];

// Helper for column border colors
const getBorderColor = (s: OrderStatus) => {
    switch (s) {
        case 'New': return 'border-l-4 border-l-blue-500';
        case 'Preparing': return 'border-l-4 border-l-yellow-500';
        case 'Ready': return 'border-l-4 border-l-green-500';
        case 'Dispatched': return 'border-l-4 border-l-slate-700';
        default: return '';
    }
};

function KanbanColumn({ status, children }: { status: OrderStatus; children: React.ReactNode }) {
    const { setNodeRef } = useDroppable({
        id: status,
    });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "bg-slate-900/50 rounded-lg p-2 flex flex-col h-full min-h-[500px] border border-slate-800 overflow-visible",
                getBorderColor(status)
            )}
        >
            <h2 className="font-semibold mb-3 px-2 flex items-center justify-between uppercase tracking-wider text-sm">
                {status}
                <span className="text-xs bg-slate-800 text-white px-2 py-1 rounded-md font-mono">
                    {Array.isArray(children) ? children.length : 0}
                </span>
            </h2>
            {/* Scrollable area, but allow overflow for animations if needed? 
                Actually 'overflow-visible' and scroll don't mix well. 
                For 'flying cards', popLayout handles the position. 
                We keep the scrollbar hidden styles requested. */}
            <div className="flex-1 overflow-y-auto space-y-3 p-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <AnimatePresence mode='popLayout'>
                    {children}
                </AnimatePresence>
            </div>
        </div>
    );
}

export function KanbanBoard() {
    const orders = useOrderStore((state) => state.orders);
    const updateStatus = useOrderStore((state) => state.updateOrderStatus);

    // Group orders by status (memoized logic in simple variable)
    const ordersByStatus = COLUMNS.reduce((acc, status) => {
        acc[status] = orders
            .filter(o => o.status === status)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return acc;
    }, {} as Record<OrderStatus, typeof orders>);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const orderId = active.id as string;
            const newStatus = over.id as OrderStatus;
            updateStatus(orderId, newStatus);
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-10rem)]">
                {COLUMNS.map((status) => (
                    <KanbanColumn key={status} status={status}>
                        {ordersByStatus[status].map((order) => (
                            <motion.div
                                key={order.id}
                                layout={true}
                                layoutId={order.id}
                                className="mb-4"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <OrderCard order={order} />
                            </motion.div>
                        ))}
                    </KanbanColumn>
                ))}
            </div>
        </DndContext>
    );
}
