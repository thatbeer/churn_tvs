"use client";

import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, UserMinus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    icon: React.ElementType;
    color: string;
}

const KPICard = ({ title, value, change, trend, icon: Icon, color }: KPICardProps) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
            </div>
            <div className={cn("p-2 rounded-lg", color)}>
                <Icon className="w-5 h-5 text-white" />
            </div>
        </div>
        <div className="flex items-center mt-4 gap-2">
            {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
            ) : (
                <TrendingDown className="w-4 h-4 text-rose-500" />
            )}
            <span className={cn(
                "text-sm font-medium",
                trend === 'up' ? "text-emerald-500" : "text-rose-500"
            )}>
                {change}
            </span>
            <span className="text-sm text-slate-400">vs last month</span>
        </div>
    </div>
);

export default function KPICards() {
    const kpis: KPICardProps[] = [
        {
            title: "Revenue Exposure (LTV)",
            value: "$124,500",
            change: "+12.5%",
            trend: "up",
            icon: DollarSign,
            color: "bg-indigo-500"
        },
        {
            title: "At-Risk Subscribers",
            value: "342",
            change: "+4.2%",
            trend: "down", // Bad trend
            icon: AlertTriangle, // Need to import AlertTriangle or use UserMinus
            color: "bg-rose-500"
        },
        {
            title: "Avg Churn Probability",
            value: "24.8%",
            change: "-1.2%",
            trend: "up", // Good trend (decrease in churn prob is good, but let's represent improvement as 'up' visually or contextually)
            // Actually usually green up arrow means increase in value. If churn prob decreases, it's good.
            // Let's say -1.2% is good, so green.
            icon: Activity,
            color: "bg-amber-500"
        },
        {
            title: "Retention Rate",
            value: "92.4%",
            change: "+0.8%",
            trend: "up",
            icon: Users,
            color: "bg-emerald-500"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi) => (
                <KPICard key={kpi.title} {...kpi} />
            ))}
        </div>
    );
}

// Fix missing import
import { AlertTriangle } from 'lucide-react';
