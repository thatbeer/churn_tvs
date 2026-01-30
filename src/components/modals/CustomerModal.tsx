"use client";

import React, { useState } from 'react';
import { X, AlertTriangle, PlayCircle, Clock, Zap, Sparkles, Check } from 'lucide-react';
import { Subscriber } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';

interface CustomerModalProps {
    subscriber: Subscriber | null;
    onClose: () => void;
}

export default function CustomerModal({ subscriber, onClose }: CustomerModalProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [planGenerated, setPlanGenerated] = useState(false);

    if (!subscriber) return null;

    const riskFactors = [
        { name: 'Buffering', value: subscriber.bufferingEvents * 10 },
        { name: 'Price', value: subscriber.plan === 'Premium' ? 80 : 40 },
        { name: 'Usage Drop', value: 100 - subscriber.watchTimeHours },
        { name: 'Competitor', value: 30 },
    ];

    const usageTrend = [
        { month: 'Jan', hours: subscriber.watchTimeHours + 20 },
        { month: 'Feb', hours: subscriber.watchTimeHours + 15 },
        { month: 'Mar', hours: subscriber.watchTimeHours + 10 },
        { month: 'Apr', hours: subscriber.watchTimeHours + 5 },
        { month: 'May', hours: subscriber.watchTimeHours },
        { month: 'Jun', hours: Math.max(0, subscriber.watchTimeHours - 5) },
    ];

    const handleGeneratePlan = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setPlanGenerated(true);
        }, 2000);
    };

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
                        {/* Risk Score Card */}
                        <div className={cn(
                            "p-6 rounded-xl border-2",
                            displayStatus === 'At-Risk' ? "bg-rose-50 border-rose-100" : "bg-emerald-50 border-emerald-100"
                        )}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-slate-600">CHURN PROBABILITY</span>
                                <div className="flex items-center gap-1 text-xs font-medium bg-white px-2 py-1 rounded-full shadow-sm">
                                    <Sparkles className="w-3 h-3 text-indigo-500" />
                                    AI Confidence: 94%
                                </div>
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

                    {/* Right Column: Analysis & Action */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Charts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 h-64">
                                <h3 className="text-sm font-semibold text-slate-900 mb-4">Risk Factors</h3>
                                <ResponsiveContainer width="100%" height="85%">
                                    <BarChart data={riskFactors} layout="vertical" margin={{ left: 20 }}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={70} tick={{ fontSize: 11 }} />
                                        <Tooltip cursor={{ fill: '#f8fafc' }} />
                                        <Bar dataKey="value" fill="#f43f5e" radius={[0, 4, 4, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 h-64">
                                <h3 className="text-sm font-semibold text-slate-900 mb-4">Usage Trend (6 Months)</h3>
                                <ResponsiveContainer width="100%" height="85%">
                                    <AreaChart data={usageTrend}>
                                        <defs>
                                            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="hours" stroke="#6366f1" fillOpacity={1} fill="url(#colorUsage)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* AI Action */}
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-indigo-900">AI Retention Strategy</h3>
                                    <p className="text-sm text-indigo-600">Generate a personalized plan to save this customer.</p>
                                </div>
                            </div>

                            {!planGenerated ? (
                                <button
                                    onClick={handleGeneratePlan}
                                    disabled={isGenerating}
                                    className="w-full py-3 bg-white border border-indigo-200 rounded-lg font-medium text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-all shadow-sm flex items-center justify-center gap-2"
                                >
                                    {isGenerating ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
                                            Analyzing customer profile...
                                        </>
                                    ) : (
                                        <>
                                            Generate Retention Plan
                                        </>
                                    )}
                                </button>
                            ) : (
                                <div className="bg-white rounded-lg border border-indigo-100 p-4 animate-in fade-in slide-in-from-bottom-2">
                                    <div className="flex items-start gap-3 mb-3">
                                        <Check className="w-5 h-5 text-emerald-500 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-slate-900">Recommended Action: "Tech Support Outreach"</h4>
                                            <p className="text-sm text-slate-600 mt-1">
                                                This user is experiencing high buffering on the Premium plan. They are likely frustrated with paying top dollar for poor performance.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 rounded border border-slate-200 p-3 text-sm text-slate-600 font-mono">
                                        Subject: We noticed some playback issues...<br />
                                        Hi {subscriber.name.split(' ')[0]},<br /><br />
                                        I noticed you've had some buffering interruptions lately. I've credited your account with a free month while our team investigates the connection to your area...
                                    </div>
                                    <div className="flex gap-3 mt-4">
                                        <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Send Email</button>
                                        <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">Edit Draft</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
