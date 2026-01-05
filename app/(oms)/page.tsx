import { KanbanBoard } from "@/components/oms/KanbanBoard";
import { AnalyticsPanel } from "@/components/oms/AnalyticsPanel";

export default function OMSPage() {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Live Order Feed</h1>
            </div>
            <div className="flex-1">
                <KanbanBoard />
            </div>
            <AnalyticsPanel />
        </div>
    );
}
