"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { generateMonthlyStats } from '@/lib/mockData';

export default function MonthlyVolumeChart() {
    const data = generateMonthlyStats();

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[400px]">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">Monthly Churn Volume</h3>
                <p className="text-sm text-slate-500">Absolute number of lost subscribers</p>
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <Tooltip
                        cursor={{ fill: '#f1f5f9' }}
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    />
                    <Bar dataKey="churned" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#f43f5e' : '#cbd5e1'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
