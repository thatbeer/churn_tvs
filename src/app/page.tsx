import KPICards from "@/components/dashboard/KPICards";
import ChurnForecastChart from "@/components/dashboard/ChurnForecastChart";
import MonthlyVolumeChart from "@/components/dashboard/MonthlyVolumeChart";
import DemographicsCharts from "@/components/dashboard/DemographicsCharts";

export default function Home() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                <div className="flex gap-2">
                    <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>Year to Date</option>
                    </select>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                        Export Report
                    </button>
                </div>
            </div>

            <KPICards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ChurnForecastChart />
                </div>
                <div>
                    <MonthlyVolumeChart />
                </div>
            </div>

            <DemographicsCharts />
        </div>
    );
}
