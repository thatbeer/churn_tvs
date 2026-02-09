import SubscriberTable from "@/components/subscribers/SubscriberTable";
import TopRiskCard from "@/components/subscribers/TopRiskCard";

export default function SubscribersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Subscribers</h1>
                    <p className="text-slate-500 mt-1">Manage and monitor your subscriber base.</p>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Export List
                </button>
            </div>

            {/* Top Highest Risk Subscribers Card */}
            <TopRiskCard />

            <SubscriberTable />
        </div>
    );
}
