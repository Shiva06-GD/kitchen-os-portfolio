'use client';

import { useOrderStore } from "@/lib/store";
import { SeparatorHorizontal, Clock, DollarSign, ListOrdered } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function MetricsBar() {
    const metrics = useOrderStore((state) => state.metrics);

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6">
            <div className="flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-purple-900 to-slate-900 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all">
                <ListOrdered className="h-4 w-4" />
                <span>Active Orders:</span>
                <span className="text-xl font-bold">{metrics.activeOrders}</span>
            </div>
            <div className="h-4 w-[1px] bg-border" />
            <div className="flex items-center gap-2 text-sm font-medium">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Revenue:</span>
                <span className="text-xl font-bold text-green-500">₹{metrics.revenueToday.toLocaleString()}</span>
            </div>
            <div className="h-4 w-[1px] bg-border" />
            <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Avg Prep:</span>
                <span className="text-xl font-bold">{metrics.avgPrepTime}m</span>
            </div>
            <div className="ml-auto">
                <ThemeToggle />
            </div>
        </header>
    );
}
