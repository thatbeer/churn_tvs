"use client";

import React from 'react';
import { X, AlertTriangle, PlayCircle, Clock, Zap, Calendar, CheckCircle, CreditCard } from 'lucide-react';
import { Subscriber } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';

interface CustomerModalProps {
    subscriber: Subscriber | null;
    onClose: () => void;
}

export default function CustomerModal({ subscriber, onClose }: CustomerModalProps) {

    if (!subscriber) return null;



    // Calculate base monthly price based on plan
    const monthlyPrice = subscriber.plan === 'Premium' ? 17.99 : subscriber.plan === 'Standard' ? 13.99 : 8.99;
    const avgSpending = monthlyPrice * 0.95; // Average spending across all users

    const purchasingTrend = [
        { month: 'Jan', spending: monthlyPrice, avgSpending: avgSpending },
        { month: 'Feb', spending: monthlyPrice, avgSpending: avgSpending },
        { month: 'Mar', spending: monthlyPrice * (subscriber.status === 'At-Risk' ? 0.9 : 1), avgSpending: avgSpending },
        { month: 'Apr', spending: monthlyPrice * (subscriber.status === 'At-Risk' ? 0.85 : 1), avgSpending: avgSpending },
        { month: 'May', spending: monthlyPrice * (subscriber.status === 'At-Risk' ? 0.7 : 1), avgSpending: avgSpending },
        { month: 'Jun', spending: monthlyPrice * (subscriber.status === 'At-Risk' ? 0.5 : 0.95), avgSpending: avgSpending },
    ];



    // Use subscriber data directly (populated from DB)
    const displayProbability = subscriber.churnProbability;
    const displayStatus = subscriber.status;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-start justify-between sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold">
                            {subscriber.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{subscriber.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                    {subscriber.id}
                                </span>
                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-100">
                                    {subscriber.plan} Plan
                                </span>
                                {subscriber.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium bg-slate-50 text-slate-500 border border-slate-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Risk & Metrics */}
                    <div className="space-y-6">
                        {/* Package Card */}
                        <div className={cn(
                            "p-4 rounded-xl border-2 relative overflow-hidden",
                            subscriber.plan === 'Premium'
                                ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
                                : subscriber.plan === 'Standard'
                                    ? "bg-gradient-to-br from-indigo-50 to-violet-50 border-indigo-200"
                                    : "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200"
                        )}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Current Package</span>
                                    <div className={cn(
                                        "text-2xl font-bold mt-1",
                                        subscriber.plan === 'Premium'
                                            ? "text-amber-600"
                                            : subscriber.plan === 'Standard'
                                                ? "text-indigo-600"
                                                : "text-slate-600"
                                    )}>
                                        {subscriber.plan}
                                    </div>
                                    <div className="text-sm text-slate-500 mt-1">
                                        ${subscriber.plan === 'Premium' ? '17.99' : subscriber.plan === 'Standard' ? '13.99' : '8.99'}/mo
                                    </div>
                                </div>
                                <div className={cn(
                                    "p-3 rounded-xl",
                                    subscriber.plan === 'Premium'
                                        ? "bg-amber-100"
                                        : subscriber.plan === 'Standard'
                                            ? "bg-indigo-100"
                                            : "bg-slate-100"
                                )}>
                                    <svg className={cn(
                                        "w-8 h-8",
                                        subscriber.plan === 'Premium'
                                            ? "text-amber-500"
                                            : subscriber.plan === 'Standard'
                                                ? "text-indigo-500"
                                                : "text-slate-500"
                                    )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                            </div>
                            {subscriber.plan === 'Premium' && (
                                <div className="absolute top-2 right-2">
                                    <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full shadow-sm">
                                        ⭐ VIP
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Risk Score Card */}
                        <div className={cn(
                            "p-6 rounded-xl border-2",
                            displayStatus === 'At-Risk' ? "bg-rose-50 border-rose-100" : "bg-emerald-50 border-emerald-100"
                        )}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-slate-600">CHURN PROBABILITY</span>
                            </div>
                            <div className={cn(
                                "text-5xl font-bold mb-2",
                                displayStatus === 'At-Risk' ? "text-rose-600" : "text-emerald-600"
                            )}>
                                {(displayProbability * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm text-slate-600">
                                {displayStatus === 'At-Risk' ? "Critical attention needed immediately." : "Customer is healthy and engaged."}
                            </div>
                        </div>

                        {/* Key Metrics */}
                        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
                            <h3 className="font-semibold text-slate-900">Key Metrics</h3>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-md shadow-sm">
                                        <Zap className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <span className="text-sm text-slate-600">Buffering Events</span>
                                </div>
                                <span className="font-bold text-slate-900">{subscriber.bufferingEvents}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-md shadow-sm">
                                        <Clock className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <span className="text-sm text-slate-600">Avg Watch Time</span>
                                </div>
                                <span className="font-bold text-slate-900">{subscriber.watchTimeHours}h/mo</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-md shadow-sm">
                                        <PlayCircle className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <span className="text-sm text-slate-600">LTV</span>
                                </div>
                                <span className="font-bold text-slate-900">${subscriber.ltv}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Purchasing Trend */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Purchasing Trend Chart */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 h-64">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-slate-900">Purchasing Trend (6 Months)</h3>
                                <div className="flex items-center gap-3 text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                        <span className="text-slate-500">Spending</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-slate-400" />
                                        <span className="text-slate-500">Avg</span>
                                    </div>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height="80%">
                                <AreaChart data={purchasingTrend}>
                                    <defs>
                                        <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(value) => `$${value}`} width={40} />
                                    <Tooltip
                                        formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                                        labelFormatter={(label) => `Month: ${label}`}
                                    />
                                    <Area type="monotone" dataKey="avgSpending" stroke="#94a3b8" strokeDasharray="5 5" fill="none" name="Avg Spending" />
                                    <Area type="monotone" dataKey="spending" stroke="#10b981" fillOpacity={1} fill="url(#colorSpending)" name="Spending" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Customer Journey Timeline */}
                        <div className="bg-white p-5 rounded-xl border border-slate-200">
                            <h3 className="text-sm font-semibold text-slate-900 mb-4">Customer Journey</h3>
                            <div className="relative">
                                {/* Timeline Line */}
                                <div className="absolute left-[17px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-500 via-indigo-500 to-slate-300" />

                                {/* Timeline Items */}
                                <div className="space-y-4">
                                    {/* Join Date */}
                                    <div className="flex items-start gap-4">
                                        <div className="relative z-10 p-2 bg-emerald-100 rounded-full">
                                            <Calendar className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-slate-900">Joined</span>
                                                <span className="text-sm text-slate-500">{subscriber.joinDate}</span>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                {Math.floor((new Date().getTime() - new Date(subscriber.joinDate).getTime()) / (1000 * 60 * 60 * 24))} days as subscriber
                                            </p>
                                        </div>
                                    </div>

                                    {/* Last Payment */}
                                    <div className="flex items-start gap-4">
                                        <div className="relative z-10 p-2 bg-indigo-100 rounded-full">
                                            <CreditCard className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-slate-900">Last Payment</span>
                                                <span className="text-sm text-slate-500">{subscriber.joinDate}</span>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                ${subscriber.plan === 'Premium' ? '17.99' : subscriber.plan === 'Standard' ? '13.99' : '8.99'} / month
                                            </p>
                                        </div>
                                    </div>

                                    {/* Last Active */}
                                    <div className="flex items-start gap-4">
                                        <div className={cn(
                                            "relative z-10 p-2 rounded-full",
                                            subscriber.status === 'At-Risk' ? "bg-amber-100" : "bg-emerald-100"
                                        )}>
                                            <CheckCircle className={cn(
                                                "w-4 h-4",
                                                subscriber.status === 'At-Risk' ? "text-amber-600" : "text-emerald-600"
                                            )} />
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-slate-900">Last Active</span>
                                                <span className="text-sm text-slate-500">{subscriber.lastActive}</span>
                                            </div>
                                            <p className={cn(
                                                "text-xs mt-0.5",
                                                subscriber.status === 'At-Risk' ? "text-amber-500" : "text-emerald-500"
                                            )}>
                                                {Math.floor((new Date().getTime() - new Date(subscriber.lastActive).getTime()) / (1000 * 60 * 60 * 24))} days ago
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
