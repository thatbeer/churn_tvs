"use client";

import React, { useMemo } from 'react';
import { DollarSign, AlertTriangle, TrendingDown, Users } from 'lucide-react';
import { getSubscribers } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function RevenueAtRisk() {
    const stats = useMemo(() => {
        const subscribers = getSubscribers();

        // Calculate at-risk subscribers (churn probability > 0.5)
        const atRiskSubs = subscribers.filter(s => s.churnProbability > 0.5);
        const criticalRiskSubs = subscribers.filter(s => s.churnProbability > 0.8);
        const moderateRiskSubs = subscribers.filter(s => s.churnProbability > 0.5 && s.churnProbability <= 0.8);

        // Calculate revenue at risk
        const totalRevenueAtRisk = atRiskSubs.reduce((sum, s) => sum + s.ltv, 0);
        const criticalRevenue = criticalRiskSubs.reduce((sum, s) => sum + s.ltv, 0);
        const moderateRevenue = moderateRiskSubs.reduce((sum, s) => sum + s.ltv, 0);

        // Total revenue for context
        const totalRevenue = subscribers.reduce((sum, s) => sum + s.ltv, 0);
        const revenueAtRiskPercent = (totalRevenueAtRisk / totalRevenue) * 100;

        return {
            totalRevenueAtRisk,
            criticalRevenue,
            moderateRevenue,
            atRiskCount: atRiskSubs.length,
            criticalCount: criticalRiskSubs.length,
            moderateCount: moderateRiskSubs.length,
            revenueAtRiskPercent,
            avgLtvAtRisk: atRiskSubs.length > 0 ? totalRevenueAtRisk / atRiskSubs.length : 0
        };
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="bg-gradient-to-br from-rose-900 via-rose-800 to-orange-900 rounded-xl border border-rose-700 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-rose-700/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-rose-500/30 rounded-xl">
                            <DollarSign className="w-6 h-6 text-rose-200" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Revenue at Risk</h2>
                            <p className="text-sm text-rose-200">Potential revenue loss from at-risk subscribers</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-white">{formatCurrency(stats.totalRevenueAtRisk)}</div>
                        <div className="text-sm text-rose-200 flex items-center justify-end gap-1">
                            <TrendingDown className="w-4 h-4" />
                            {stats.revenueAtRiskPercent.toFixed(1)}% of total LTV
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Critical Risk */}
                    <div className="bg-rose-950/50 backdrop-blur-sm rounded-xl p-4 border border-rose-600/30">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                            <span className="text-sm font-medium text-rose-200">Critical Risk (&gt;80%)</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{formatCurrency(stats.criticalRevenue)}</div>
                        <div className="flex items-center gap-1 text-sm text-rose-300">
                            <Users className="w-4 h-4" />
                            {stats.criticalCount} subscribers
                        </div>
                    </div>

                    {/* Moderate Risk */}
                    <div className="bg-orange-950/50 backdrop-blur-sm rounded-xl p-4 border border-orange-600/30">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-3 h-3 rounded-full bg-orange-500" />
                            <span className="text-sm font-medium text-orange-200">Moderate Risk (50-80%)</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{formatCurrency(stats.moderateRevenue)}</div>
                        <div className="flex items-center gap-1 text-sm text-orange-300">
                            <Users className="w-4 h-4" />
                            {stats.moderateCount} subscribers
                        </div>
                    </div>

                    {/* Average LTV at Risk */}
                    <div className="bg-amber-950/50 backdrop-blur-sm rounded-xl p-4 border border-amber-600/30">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            <span className="text-sm font-medium text-amber-200">Avg LTV at Risk</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{formatCurrency(stats.avgLtvAtRisk)}</div>
                        <div className="flex items-center gap-1 text-sm text-amber-300">
                            <span>per at-risk subscriber</span>
                        </div>
                    </div>
                </div>

                {/* Visual Bar */}
                <div className="mt-6">
                    <div className="flex items-center justify-between text-sm text-rose-200 mb-2">
                        <span>Risk Distribution</span>
                        <span>{stats.atRiskCount} total at-risk</span>
                    </div>
                    <div className="h-3 bg-rose-950 rounded-full overflow-hidden flex">
                        <div
                            className="h-full bg-rose-500 transition-all duration-500"
                            style={{ width: `${(stats.criticalCount / Math.max(stats.atRiskCount, 1)) * 100}%` }}
                        />
                        <div
                            className="h-full bg-orange-500 transition-all duration-500"
                            style={{ width: `${(stats.moderateCount / Math.max(stats.atRiskCount, 1)) * 100}%` }}
                        />
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-rose-300">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-rose-500" />
                            <span>Critical</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                            <span>Moderate</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
