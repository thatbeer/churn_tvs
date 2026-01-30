"use client";

import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, AlertCircle, CheckCircle } from 'lucide-react';
import { getSubscribers, Subscriber } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import CustomerModal from '@/components/modals/CustomerModal';

export default function SubscriberTable() {
    const [subscribers] = useState<Subscriber[]>(getSubscribers());
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Subscriber; direction: 'asc' | 'desc' } | null>(null);
    const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);

    const handleSort = (key: keyof Subscriber) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredSubscribers = subscribers.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        if (!sortConfig) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-emerald-100 text-emerald-700';
            case 'At-Risk': return 'bg-rose-100 text-rose-700';
            case 'Churned': return 'bg-slate-100 text-slate-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Table Header / Controls */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search subscribers..."
                        className="pl-10 pr-4 py-2 w-full rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                    <Filter className="w-4 h-4" />
                    Filters
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('name')}>Subscriber</th>
                            <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('plan')}>Plan</th>
                            <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('status')}>Status</th>
                            <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('ltv')}>LTV</th>
                            <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('favoriteGenre')}>Genre</th>
                            <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('churnProbability')}>Risk Score</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {filteredSubscribers.map((sub) => (
                            <tr
                                key={sub.id}
                                className="hover:bg-slate-50 transition-colors cursor-pointer group"
                                onClick={() => setSelectedSubscriber(sub)}
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                            {sub.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{sub.name}</div>
                                            <div className="text-xs text-slate-500">{sub.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                                        {sub.plan}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusColor(sub.status))}>
                                        {sub.status === 'At-Risk' && <AlertCircle className="w-3 h-3 mr-1" />}
                                        {sub.status === 'Active' && <CheckCircle className="w-3 h-3 mr-1" />}
                                        {sub.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-700">
                                    ${sub.ltv}
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    {sub.favoriteGenre}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={cn("h-full rounded-full",
                                                    sub.churnProbability > 0.7 ? "bg-rose-500" :
                                                        sub.churnProbability > 0.3 ? "bg-amber-500" : "bg-emerald-500"
                                                )}
                                                style={{ width: `${sub.churnProbability * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-medium text-slate-600">{(sub.churnProbability * 100).toFixed(0)}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination (Mock) */}
            <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
                <div>Showing 1 to {filteredSubscribers.length} of {subscribers.length} results</div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Next</button>
                </div>
            </div>

            {selectedSubscriber && (
                <CustomerModal
                    subscriber={selectedSubscriber}
                    onClose={() => setSelectedSubscriber(null)}
                />
            )}
        </div>
    );
}
