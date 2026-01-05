import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { OrderSimulator } from "@/components/oms/OrderSimulator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cloud Kitchen OMS",
    description: "Order Management & Kitchen Display System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={cn(inter.className, "bg-background text-foreground antialiased min-h-screen")}>
                <OrderSimulator />
                {children}
            </body>
        </html>
    );
}
