'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useOrderStore } from "@/lib/store";
import { useEffect, useState } from "react";

// Realistic mock data generator for "Orders per Hour"
// We'll simulate a 12-hour shift (10 AM to 10 PM)
const generateMockData = () => {
    const data = [];
    const hours = ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM'];

    // Simulate peak times (lunch 12-2, dinner 7-9)
    for (let i = 0; i < hours.length; i++) {
        let base = 10;
        if (i >= 2 && i <= 4) base += 25; // Lunch peak
        if (i >= 9 && i <= 11) base += 35; // Dinner peak

        // Add randomness
        const value = base + Math.floor(Math.random() * 15);
        data.push({ name: hours[i], orders: value });
    }
    return data;
};

export function AnalyticsPanel() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        setData(generateMockData());
        // Optional: refresh data occasionally or sync with real store if we had timestamps
    }, []);

    return (
        <Card className="col-span-1 mt-6 border-slate-800 bg-slate-900/50">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-slate-200">
                    Live Performance: Orders per Hour
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 10,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#64748b"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                itemStyle={{ color: '#34d399' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="orders"
                                stroke="#34d399"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorOrders)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
