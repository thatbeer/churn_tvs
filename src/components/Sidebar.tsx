"use client";

import React, { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    Layers,
    AlertTriangle,
    Activity,
    ChevronLeft,
    ChevronRight,
    Settings,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: 'Overview', icon: LayoutDashboard, href: '/' },
        { name: 'Subscribers', icon: Users, href: '/subscribers' },
        { name: 'Groups', icon: Layers, href: '/groups' },
        { name: 'Risk Alerts', icon: AlertTriangle, href: '/alerts' },
    ];

    return (
        <div className={cn(
            "flex flex-col h-screen bg-slate-900 text-white transition-all duration-300 border-r border-slate-800",
            collapsed ? "w-20" : "w-64"
        )}>
            {/* Logo */}
            <div className="flex items-center p-4 h-16 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    {!collapsed && (
                        <span className="font-bold text-lg tracking-tight">StreamGuard</span>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                                isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                            {!collapsed && (
                                <span className="font-medium">{item.name}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* System Status */}
            <div className="p-4 border-t border-slate-800">
                {!collapsed ? (
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-slate-400">SYSTEM STATUS</span>
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        </div>
                        <div className="text-sm font-medium text-slate-200">Model v2.4 Active</div>
                        <div className="text-xs text-slate-500 mt-1">Last updated: 2m ago</div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="System Active" />
                    </div>
                )}
            </div>

            {/* User Profile & Collapse */}
            <div className="p-4 border-t border-slate-800 flex items-center justify-between">
                {!collapsed && (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                            <span className="text-xs font-bold">JD</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">John Doe</span>
                            <span className="text-xs text-slate-500">Admin</span>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 transition-colors"
                >
                    {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
}
