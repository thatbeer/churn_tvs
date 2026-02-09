"use client";

import React, { useState, useMemo } from 'react';
import { AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';
import { getSubscribers, Subscriber } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import CustomerModal from '@/components/modals/CustomerModal';

export default function TopRiskCard() {
    const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
    
    const topRiskSubscribers = useMemo(() => {
        const subscribers = getSubscribers();
        return [...subscribers]
            .sort((a, b) => b.churnProbability - a.churnProbability)
            .slice(0, 5);
    }, []);

    const getRiskColor = (probability: number) => {
        if (probability > 0.8) return 'text-rose-500';
        if (probability > 0.7) return 'text-orange-500';
        return 'text-amber-500';
    };

    const getRiskBgColor = (probability: number) => {
        if (probability > 0.8) return 'bg-rose-500';
        if (probability > 0.7) return 'bg-orange-500';
        return 'bg-amber-500';
    };

    return (
        <>
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="p-5 border-b border-slate-700/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-rose-500/20 rounded-lg">
                                <AlertTriangle className="w-5 h-5 text-rose-400" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-white">Highest Risk Subscribers</h2>
                                <p className="text-sm text-slate-400">Top 5 subscribers most likely to churn</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-rose-400">
                            <TrendingUp className="w-4 h-4" />
                            <span>Requires Attention</span>
                        </div>
                    </div>
                </div>

                {/* Risk Cards Grid */}
                <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {topRiskSubscribers.map((sub, index) => (
                            <div
                                key={sub.id}
                                onClick={() => setSelectedSubscriber(sub)}
                                className="group relative bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-rose-500/50 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-rose-500/10"
                            >
                                {/* Rank Badge */}
                                <div className="absolute -top-2 -left-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                    {index + 1}
                                </div>

                                {/* Subscriber Info */}
                                <div className="flex flex-col items-center text-center space-y-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {sub.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white truncate max-w-full" title={sub.name}>
                                            {sub.name.split(' ')[0]}
                                        </h3>
                                        <p className="text-xs text-slate-400">{sub.plan}</p>
                                    </div>

                                    {/* Risk Score */}
                                    <div className="w-full">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs text-slate-400">Risk</span>
                                            <span className={cn("text-sm font-bold", getRiskColor(sub.churnProbability))}>
                                                {(sub.churnProbability * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className={cn("h-full rounded-full transition-all duration-500", getRiskBgColor(sub.churnProbability))}
                                                style={{ width: `${sub.churnProbability * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* LTV */}
                                    <div className="text-xs text-slate-400">
                                        LTV: <span className="text-emerald-400 font-medium">${sub.ltv}</span>
                                    </div>

                                    {/* Action Hint */}
                                    <div className="flex items-center gap-1 text-xs text-slate-500 group-hover:text-rose-400 transition-colors">
                                        <span>View Details</span>
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedSubscriber && (
                <CustomerModal
                    subscriber={selectedSubscriber}
                    onClose={() => setSelectedSubscriber(null)}
                />
            )}
        </>
    );
}
