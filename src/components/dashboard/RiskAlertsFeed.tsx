"use client";

import React, { useState } from 'react';
import { AlertTriangle, Info, AlertCircle, Clock, ChevronRight } from 'lucide-react';
import { generateRiskAlerts, RiskAlert } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function RiskAlertsFeed() {
    const [alerts] = useState<RiskAlert[]>(generateRiskAlerts(10));

    const getIcon = (type: RiskAlert['type']) => {
        switch (type) {
            case 'Critical': return <AlertCircle className="w-5 h-5 text-rose-500" />;
            case 'Warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
            case 'Info': return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getBgColor = (type: RiskAlert['type']) => {
        switch (type) {
            case 'Critical': return 'bg-rose-50 border-rose-100';
            case 'Warning': return 'bg-amber-50 border-amber-100';
            case 'Info': return 'bg-blue-50 border-blue-100';
        }
    };

    return (
        <div className="space-y-4">
            {alerts.map((alert) => (
                <div
                    key={alert.id}
                    className={cn(
                        "p-4 rounded-xl border flex items-start gap-4 transition-all hover:shadow-md cursor-pointer",
                        getBgColor(alert.type)
                    )}
                >
                    <div className="mt-1 bg-white p-2 rounded-full shadow-sm">
                        {getIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-slate-900">{alert.message}</h4>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                            Subscriber: <span className="font-medium text-slate-800">{alert.subscriberName}</span> ({alert.subscriberId})
                        </p>
                        <div className="flex items-center gap-2">
                            <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full font-medium border",
                                alert.type === 'Critical' ? "bg-rose-100 text-rose-700 border-rose-200" :
                                    alert.type === 'Warning' ? "bg-amber-100 text-amber-700 border-amber-200" :
                                        "bg-blue-100 text-blue-700 border-blue-200"
                            )}>
                                {alert.type}
                            </span>
                        </div>
                    </div>
                    <div className="self-center">
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
            ))}
        </div>
    );
}
