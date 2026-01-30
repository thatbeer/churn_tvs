import React from 'react';
import RiskAlertsFeed from '@/components/dashboard/RiskAlertsFeed';
import { Bell } from 'lucide-react';

export default function AlertsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Risk Alerts</h1>
                    <p className="text-slate-500 mt-1">Real-time notifications about at-risk subscribers and system events.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 shadow-sm">
                    <Bell className="w-4 h-4" />
                    Configure Alerts
                </button>
            </div>

            <div className="max-w-3xl">
                <RiskAlertsFeed />
            </div>
        </div>
    );
}
