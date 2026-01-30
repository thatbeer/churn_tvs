"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const PLAN_DATA = [
    { name: 'Basic', value: 45, color: '#94a3b8' },
    { name: 'Standard', value: 30, color: '#6366f1' },
    { name: 'Premium', value: 25, color: '#4f46e5' },
];

const GENRE_DATA = [
    { name: 'Action', value: 35 },
    { name: 'Drama', value: 25 },
    { name: 'Comedy', value: 20 },
    { name: 'Sci-Fi', value: 15 },
    { name: 'Doc', value: 5 },
];

export default function DemographicsCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* At-Risk by Plan */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[350px]">
                <h3 className="text-lg font-bold text-slate-900 mb-4">At-Risk by Plan</h3>
                <div className="flex h-[80%]">
                    <ResponsiveContainer width="60%" height="100%">
                        <PieChart>
                            <Pie
                                data={PLAN_DATA}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {PLAN_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-col justify-center gap-3 w-[40%]">
                        {PLAN_DATA.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-sm text-slate-600">{item.name}</span>
                                <span className="text-sm font-bold text-slate-900 ml-auto">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* At-Risk by Genre */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[350px]">
                <h3 className="text-lg font-bold text-slate-900 mb-4">At-Risk by Genre</h3>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={GENRE_DATA} layout="vertical" margin={{ left: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={60} tick={{ fontSize: 12 }} />
                        <Tooltip cursor={{ fill: '#f8fafc' }} />
                        <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
