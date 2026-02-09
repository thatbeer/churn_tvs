"use client";

import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle, AlertTriangle, XCircle, Users } from 'lucide-react';
import { getSubscribers } from '@/lib/mockData';

interface StatusData {
    name: string;
    value: number;
    color: string;
    icon: React.ElementType;
    description: string;
}

export default function ChurnStatusDistribution() {
    const { statusData, totalCount } = useMemo(() => {
        const subscribers = getSubscribers();
        const total = subscribers.length;

        // Count by status
        const activeCount = subscribers.filter(s => s.status === 'Active').length;
        const atRiskCount = subscribers.filter(s => s.status === 'At-Risk').length;
        const churnedCount = subscribers.filter(s => s.status === 'Churned').length;

        const data: StatusData[] = [
            {
                name: 'Active',
                value: activeCount,
                color: '#10b981',
                icon: CheckCircle,
                description: 'Healthy subscribers'
            },
            {
                name: 'At-Risk',
                value: atRiskCount,
                color: '#f59e0b',
                icon: AlertTriangle,
                description: 'Predicted to churn'
            },
            {
                name: 'Churned',
                value: churnedCount,
                color: '#ef4444',
                icon: XCircle,
                description: 'Already churned'
            },
        ];

        return { statusData: data, totalCount: total };
    }, []);

    const getPercentage = (value: number) => {
        return ((value / totalCount) * 100).toFixed(1);
    };

    // Custom tooltip
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-slate-800 px-3 py-2 rounded-lg shadow-lg border border-slate-700">
                    <p className="text-white font-medium">{data.name}</p>
                    <p className="text-slate-300 text-sm">{data.value} subscribers ({getPercentage(data.value)}%)</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Churn Status Distribution</h3>
                    <p className="text-sm text-slate-500">Current subscriber classification</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Users className="w-4 h-4" />
                    <span>{totalCount} total</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Donut Chart */}
                <div className="w-[200px] h-[200px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={85}
                                paddingAngle={3}
                                dataKey="value"
                                strokeWidth={0}
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-slate-900">{totalCount}</span>
                        <span className="text-xs text-slate-500">Total</span>
                    </div>
                </div>

                {/* Legend with Details */}
                <div className="flex-1 space-y-4">
                    {statusData.map((item) => {
                        const Icon = item.icon;
                        const percentage = parseFloat(getPercentage(item.value));

                        return (
                            <div key={item.name} className="flex items-center gap-3">
                                <div
                                    className="p-2 rounded-lg"
                                    style={{ backgroundColor: `${item.color}20` }}
                                >
                                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-slate-900">{item.name}</span>
                                        <span className="text-sm font-bold text-slate-900">{item.value}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${percentage}%`,
                                                    backgroundColor: item.color
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs font-medium text-slate-500 w-12 text-right">
                                            {percentage}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Summary Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>
                            <strong>{getPercentage(statusData[0].value)}%</strong> healthy retention
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span>
                            <strong>{statusData[1].value}</strong> need attention
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
