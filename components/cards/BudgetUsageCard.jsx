"use client";

import React, { useMemo, useState, useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TrendingUp, ChevronDown } from "lucide-react";
import { budgetCategories } from "@/lib/chartData";
import { formatCurrency } from "@/lib/utils";

const BudgetUsageCard = React.memo(function BudgetUsageCard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("1 YEARS");

  const handleOpen = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback((value) => {
    if (value) setFilter(value);
    setAnchorEl(null);
  }, []);

  const categories = useMemo(() => budgetCategories, []);

  return (
    <Card className="h-full">
      <CardContent className="p-5 sm:p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-brand-gray-700">Budget Usage</h3>
          <button
            onClick={handleOpen}
            className="flex items-center gap-1 text-xs font-medium text-brand-gray-500 bg-brand-gray-50 px-2.5 py-1.5 rounded-full hover:bg-brand-gray-100 transition-colors"
            aria-label="Filter budget period"
          >
            {filter} <ChevronDown className="w-3 h-3" />
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
            slotProps={{ paper: { sx: { borderRadius: 2, mt: 0.5 } } }}
          >
            {["1 YEARS", "6 MONTHS", "3 MONTHS"].map((opt) => (
              <MenuItem
                key={opt}
                onClick={() => handleClose(opt)}
                sx={{ fontSize: "0.75rem", fontWeight: 500 }}
              >
                {opt}
              </MenuItem>
            ))}
          </Menu>
        </div>

        <div className="mb-1">
          <span className="text-3xl sm:text-4xl font-bold text-brand-gray-900">
            {formatCurrency(34740)}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          <TrendingUp className="w-3.5 h-3.5 text-brand-green" />
          <span className="text-xs font-semibold text-brand-green">12%</span>
          <span className="text-xs text-brand-gray-400">From Last Month</span>
        </div>

        <p className="text-xs text-brand-gray-500 mb-3">
          Optimize Again To Get Your Best Result
        </p>

        <div className="flex items-center gap-1 mb-1">
          {categories.map((cat) => (
            <div key={cat.label} className="flex-1 text-center">
              <span className="text-xs font-semibold text-brand-gray-600">
                {cat.percentage}%
              </span>
            </div>
          ))}
        </div>

        <div className="flex h-3 rounded-full overflow-hidden mb-5" role="progressbar">
          {categories.map((cat, i) => (
            <div
              key={cat.label}
              className="h-full transition-all duration-500"
              style={{
                width: `${cat.percentage}%`,
                backgroundColor: cat.color,
                marginLeft: i > 0 ? "3px" : 0,
                borderRadius: "6px",
              }}
              aria-label={`${cat.label}: ${cat.percentage}%`}
            />
          ))}
        </div>

        <div className="space-y-2.5 mt-auto">
          {categories.map((cat) => (
            <div key={cat.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-xs text-brand-gray-500">{cat.label}</span>
              </div>
              <span className="text-xs font-semibold text-brand-gray-700">
                {formatCurrency(cat.amount)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

export default BudgetUsageCard;
