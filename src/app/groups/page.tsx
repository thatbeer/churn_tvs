import React from 'react';
import { Users, Plus } from 'lucide-react';

export default function GroupsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Subscriber Groups</h1>
                    <p className="text-slate-500 mt-1">Manage segments and cohorts for targeted retention campaigns.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm shadow-indigo-200">
                    <Plus className="w-4 h-4" />
                    Create Group
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['High Risk - Action Fans', 'Loyal - Premium Users', 'New Signups (Last 30 Days)'].map((group, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                            <Users className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1">{group}</h3>
                        <p className="text-sm text-slate-500 mb-4">124 Subscribers • Avg Risk: {20 + i * 15}%</p>
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(j => (
                                <div key={j} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600">
                                    U{j}
                                </div>
                            ))}
                            <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-500">
                                +42
                            </div>
                        </div>
                    </div>
                ))}

                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors cursor-pointer min-h-[200px]">
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="font-medium">Create New Segment</span>
                </div>
            </div>
        </div>
    );
}
