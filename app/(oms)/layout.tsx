import { Sidebar } from "@/components/shell/Sidebar";
import { MetricsBar } from "@/components/shell/MetricsBar";

export default function OMSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <MetricsBar />
                <main className="flex-1 p-6 relative">
                    {children}
                </main>
            </div>
        </div>
    );
}
