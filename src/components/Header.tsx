"use client";

import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    const getBreadcrumb = () => {
        switch (pathname) {
            case '/': return 'Dashboard Overview';
            case '/subscribers': return 'Subscriber List';
            case '/groups': return 'Subscriber Groups';
            case '/alerts': return 'Risk Alerts';
            default: return 'Dashboard';
        }
    };

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-slate-800">{getBreadcrumb()}</h2>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-full border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                    />
                </div>

                <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <Bell className="w-5 h-5 text-slate-600" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="w-px h-8 bg-slate-200 mx-2"></div>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">Netflix Inc.</span>
                </div>
            </div>
        </header>
    );
}
