"use client";

import React, { useCallback } from "react";
import { HelpCircle, Mail, Bell, Menu } from "lucide-react";
import Avatar from "@mui/material/Avatar";

const Topbar = React.memo(function Topbar({ onMenuClick }) {
  const handleMenuClick = useCallback(() => {
    onMenuClick();
  }, [onMenuClick]);

  return (
    <header className="sticky top-0 z-30 bg-brand-bg/80 backdrop-blur-md border-b border-brand-gray-100">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px]">
        <div className="flex items-center gap-3">
          <button
            onClick={handleMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-brand-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-brand-gray-600" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-brand-gray-900">Overview</h1>
            <p className="text-xs sm:text-sm text-brand-gray-500 hidden sm:block">
              Let&apos;s see what we&apos;ve got for you today
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            className="p-2 sm:p-2.5 rounded-full hover:bg-brand-gray-100 transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5 text-brand-gray-500" />
          </button>
          <button
            className="p-2 sm:p-2.5 rounded-full hover:bg-brand-gray-100 transition-colors"
            aria-label="Mail"
          >
            <Mail className="w-5 h-5 text-brand-gray-500" />
          </button>
          <button
            className="p-2 sm:p-2.5 rounded-full hover:bg-brand-gray-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-brand-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-red rounded-full" />
          </button>

          <div className="h-8 w-px bg-brand-gray-200 mx-1 sm:mx-2 hidden sm:block" />

          <button
            className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2 pr-1 py-1 rounded-full hover:bg-brand-gray-50 transition-colors"
            aria-label="User menu"
          >
            <Avatar
              alt="Henry Norman"
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#F5C542",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              HN
            </Avatar>
            <div className="text-left hidden md:block">
              <p className="text-sm font-semibold text-brand-gray-900 leading-tight">
                Henry Norman
              </p>
              <p className="text-xs text-brand-gray-400 leading-tight">
                Henry.norman@gmail.com
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
});

export default Topbar;
