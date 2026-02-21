"use client";

import React, { useState, useCallback } from "react";
import {
  LayoutDashboard,
  BarChart3,
  MessageSquare,
  Wallet,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainMenu = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Analytics", icon: BarChart3, href: "/analytics" },
  { label: "Message", icon: MessageSquare, href: "/messages", badge: 25 },
  { label: "My Wallet", icon: Wallet, href: "/wallet" },
  { label: "Credit Card", icon: CreditCard, href: "/credit-card" },
];

const generalTools = [
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "Help Center", icon: HelpCircle, href: "/help" },
  { label: "Log Out", icon: LogOut, href: "/logout" },
];

const Sidebar = React.memo(function Sidebar({ mobileOpen, onClose }) {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleNavClick = useCallback((label) => {
    setActiveItem(label);
  }, []);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-[250px] bg-white border-r border-brand-gray-100 flex flex-col transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static lg:z-auto",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-brand-gray-900">betakit</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-brand-gray-100"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-brand-gray-500" />
          </button>
        </div>

        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray-400" />
            <input
              type="text"
              placeholder="Search"
              aria-label="Search navigation"
              className="w-full pl-9 pr-3 py-2.5 bg-brand-gray-50 border border-brand-gray-200 rounded-xl text-sm text-brand-gray-700 placeholder:text-brand-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4" aria-label="Main navigation">
          <p className="text-[11px] font-semibold text-brand-gray-400 uppercase tracking-wider px-3 mb-2">
            Main Menu
          </p>
          <ul className="space-y-1">
            {mainMenu.map((item) => {
              const isActive = activeItem === item.label;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.label)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-brand-teal text-white shadow-md shadow-brand-teal/25"
                        : "text-brand-gray-600 hover:bg-brand-gray-50 hover:text-brand-gray-900"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          "min-w-[22px] h-[22px] flex items-center justify-center rounded-full text-[11px] font-semibold px-1.5",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-brand-teal/10 text-brand-teal"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="text-[11px] font-semibold text-brand-gray-400 uppercase tracking-wider px-3 mt-6 mb-2">
            General Tools
          </p>
          <ul className="space-y-1">
            {generalTools.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNavClick(item.label)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-gray-600 hover:bg-brand-gray-50 hover:text-brand-gray-900 transition-colors"
                >
                  <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-brand-yellow-light rounded-2xl p-4 relative overflow-hidden">
            <div className="w-12 h-12 bg-brand-teal rounded-xl flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <p className="font-bold text-brand-gray-900 text-sm">Upgrade to pro</p>
            <p className="text-xs text-brand-gray-500 mt-1 leading-relaxed">
              Discover the benefits of an upgraded account.
            </p>
            <button className="flex items-center gap-1 mt-3 text-xs font-semibold text-brand-teal hover:text-brand-teal-dark transition-colors">
              UPGRADE NOW $20 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
});

export default Sidebar;
