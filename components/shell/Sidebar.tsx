'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ChefHat, Settings, UtensilsCrossed } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const links = [
        { name: "Order Feed", href: "/", icon: LayoutDashboard },
        { name: "Kitchen (KDS)", href: "/kds", icon: ChefHat },
        { name: "Menu", href: "/menu", icon: UtensilsCrossed },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-card">
            <div className="flex h-14 items-center border-b border-border/40 px-4 bg-slate-900/50">
                <span className="text-lg font-bold tracking-wider text-primary">KITCHEN OS // CENTRAL</span>
            </div>
            <div className="flex-1 py-4">
                <nav className="grid gap-1 px-2">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Button
                                key={link.href}
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn("justify-start", isActive && "bg-secondary")}
                                asChild
                            >
                                <Link href={link.href}>
                                    <Icon className="mr-2 h-4 w-4" />
                                    {link.name}
                                </Link>
                            </Button>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
