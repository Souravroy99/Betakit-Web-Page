"use client";

import React, { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <div className="flex h-screen bg-brand-bg overflow-hidden">
      <Sidebar mobileOpen={mobileOpen} onClose={handleCloseSidebar} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onMenuClick={handleToggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
