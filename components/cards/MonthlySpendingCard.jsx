"use client";

import React, { useState, useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TrendingDown, Zap, ChevronDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const MonthlySpendingCard = React.memo(function MonthlySpendingCard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("JULY");

  const handleOpen = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback((value) => {
    if (value) setFilter(value);
    setAnchorEl(null);
  }, []);

  const months = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
  ];

  return (
    <Card className="h-full">
      <CardContent className="p-5 sm:p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-brand-gray-700">Monthly Spending</h3>
          <button
            onClick={handleOpen}
            className="flex items-center gap-1 text-xs font-medium text-brand-gray-500 bg-brand-gray-50 px-2.5 py-1.5 rounded-full hover:bg-brand-gray-100 transition-colors"
            aria-label="Filter month"
          >
            {filter} <ChevronDown className="w-3 h-3" />
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
            slotProps={{
              paper: {
                sx: { borderRadius: 2, mt: 0.5, minWidth: 140, maxHeight: 240 },
              },
            }}
          >
            {months.map((m) => (
              <MenuItem
                key={m}
                onClick={() => handleClose(m)}
                sx={{ fontSize: "0.75rem", fontWeight: 500 }}
              >
                {m}
              </MenuItem>
            ))}
          </Menu>
        </div>

        <div className="flex items-end gap-3 mb-5">
          <span className="text-3xl sm:text-4xl font-bold text-brand-gray-900 leading-none">
            {formatCurrency(22189)}
          </span>
          <div className="mb-0.5">
            <svg width="60" height="24" viewBox="0 0 60 24" className="text-brand-red">
              <path
                d="M0 6 L10 10 L20 8 L30 14 L40 12 L50 20 L60 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-gray-50 flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-3.5 h-3.5 text-brand-gray-500" />
            </div>
            <span className="text-xs text-brand-gray-500">Total Expenses</span>
            <span className="text-xs font-semibold text-brand-red ml-auto">-3.7% ↓</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-gray-50 flex items-center justify-center flex-shrink-0">
              <Zap className="w-3.5 h-3.5 text-brand-gray-500" />
            </div>
            <span className="text-xs text-brand-gray-500">Monthly Salary</span>
            <span className="text-xs font-semibold text-brand-green ml-auto">
              +{formatCurrency(13300)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default MonthlySpendingCard;
