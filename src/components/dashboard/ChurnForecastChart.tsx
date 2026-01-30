"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { generateMonthlyStats } from '@/lib/mockData';

export default function ChurnForecastChart() {
    const data = generateMonthlyStats();

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[400px]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Churn Forecast</h3>
                    <p className="text-sm text-slate-500">Historical vs Predicted Churn Rate</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                        <span className="text-slate-600">Actual</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-indigo-300 border border-indigo-500 border-dashed"></span>
                        <span className="text-slate-600">Predicted</span>
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#1e293b' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="churned"
                        stroke="#6366f1"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorChurn)"
                    />
                    <Area
                        type="monotone"
                        dataKey="predicted"
                        stroke="#818cf8"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPred)"
                    />
                    <ReferenceLine x="May" stroke="#94a3b8" strokeDasharray="3 3" label={{ value: 'Today', position: 'top', fill: '#94a3b8', fontSize: 12 }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
