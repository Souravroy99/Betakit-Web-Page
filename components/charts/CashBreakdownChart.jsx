"use client";

import React, { useMemo, useState, useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ChevronDown, ClipboardList } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  Customized,
} from "recharts";
import { cashBreakdownData } from "@/lib/chartData";
import { formatCurrency } from "@/lib/utils";

const HIGHLIGHT_MONTH = "JUN";

const COLORS = {
  incomeBase: "#9CC5B5",
  incomeStripe: "#89B5A3",
  incomeActive: "#7BB8A4",
  incomeStripeActive: "#69A892",
  expenseBase: "#D5C98E",
  expenseStripe: "#C5B97E",
  expenseActive: "#C8BC78",
  expenseStripeActive: "#B5A96A",
};

const renderHatchPatterns = () => (
  <defs>
    <pattern
      id="hatch-income"
      patternUnits="userSpaceOnUse"
      width="6"
      height="6"
      patternTransform="rotate(45)"
    >
      <rect width="6" height="6" fill={COLORS.incomeBase} />
      <line x1="0" y1="0" x2="0" y2="6" stroke={COLORS.incomeStripe} strokeWidth="2" />
    </pattern>
    <pattern
      id="hatch-income-active"
      patternUnits="userSpaceOnUse"
      width="6"
      height="6"
      patternTransform="rotate(45)"
    >
      <rect width="6" height="6" fill={COLORS.incomeActive} />
      <line x1="0" y1="0" x2="0" y2="6" stroke={COLORS.incomeStripeActive} strokeWidth="2" />
    </pattern>
    <pattern
      id="hatch-expense"
      patternUnits="userSpaceOnUse"
      width="6"
      height="6"
      patternTransform="rotate(45)"
    >
      <rect width="6" height="6" fill={COLORS.expenseBase} />
      <line x1="0" y1="0" x2="0" y2="6" stroke={COLORS.expenseStripe} strokeWidth="2" />
    </pattern>
    <pattern
      id="hatch-expense-active"
      patternUnits="userSpaceOnUse"
      width="6"
      height="6"
      patternTransform="rotate(45)"
    >
      <rect width="6" height="6" fill={COLORS.expenseActive} />
      <line x1="0" y1="0" x2="0" y2="6" stroke={COLORS.expenseStripeActive} strokeWidth="2" />
    </pattern>
  </defs>
);

const TopRoundedBar = ({ x, y, width, height, fill }) => {
  if (!width || !height) return null;
  const absH = Math.abs(height);
  const topY = height >= 0 ? y : y + height;
  const r = Math.min(6, width / 2, absH / 2);
  return (
    <path
      d={`
        M ${x + r},${topY}
        Q ${x},${topY} ${x},${topY + r}
        L ${x},${topY + absH}
        L ${x + width},${topY + absH}
        L ${x + width},${topY + r}
        Q ${x + width},${topY} ${x + width - r},${topY}
        Z
      `}
      fill={fill}
    />
  );
};

const BottomRoundedBar = ({ x, y, width, height, fill }) => {
  if (!width || !height) return null;
  const absH = Math.abs(height);
  const topY = height >= 0 ? y : y + height;
  const botY = topY + absH;
  const r = Math.min(6, width / 2, absH / 2);
  return (
    <path
      d={`
        M ${x},${topY}
        L ${x + width},${topY}
        L ${x + width},${botY - r}
        Q ${x + width},${botY} ${x + width - r},${botY}
        L ${x + r},${botY}
        Q ${x},${botY} ${x},${botY - r}
        Z
      `}
      fill={fill}
    />
  );
};

const CustomXAxisTick = ({ x, y, payload }) => {
  const isHighlighted = payload.value === HIGHLIGHT_MONTH;
  return (
    <text
      x={x}
      y={y + 14}
      textAnchor="middle"
      fill={isHighlighted ? "#1F2937" : "#9CA3AF"}
      fontSize={11}
      fontWeight={isHighlighted ? 700 : 500}
      fontFamily="var(--font-inter), system-ui, sans-serif"
    >
      {payload.value}
    </text>
  );
};

const AnnotationLabel = (props) => {
  const { x, y, width, index } = props;
  if (cashBreakdownData[index]?.month !== HIGHLIGHT_MONTH) return null;

  const labelW = 78;
  const labelH = 22;
  const cx = x + width / 2;
  const cy = y - 14;
  const arrowSize = 5;

  return (
    <g>
      <rect
        x={cx - labelW / 2}
        y={cy - labelH / 2}
        width={labelW}
        height={labelH}
        rx={11}
        fill="#E4E2D4"
      />
      <polygon
        points={`${cx - arrowSize},${cy + labelH / 2} ${cx + arrowSize},${cy + labelH / 2} ${cx},${cy + labelH / 2 + arrowSize}`}
        fill="#E4E2D4"
      />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize={10}
        fontWeight={600}
        fill="#6B8068"
        fontFamily="var(--font-inter), system-ui, sans-serif"
      >
        ↑ +12.23%
      </text>
    </g>
  );
};

const CustomTooltip = React.memo(function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-brand-gray-100 p-3 min-w-[140px]">
      <p className="text-xs font-semibold text-brand-gray-700 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor:
                  entry.dataKey === "income"
                    ? COLORS.incomeActive
                    : COLORS.expenseActive,
              }}
            />
            <span className="text-[11px] text-brand-gray-500 capitalize">
              {entry.dataKey === "income" ? "Income" : "Expenses"}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-brand-gray-800">
            {formatCurrency(Math.abs(entry.value))}
          </span>
        </div>
      ))}
    </div>
  );
});

const CashBreakdownChart = React.memo(function CashBreakdownChart() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("12 MONTHS");

  const handleOpen = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback((value) => {
    if (value) setFilter(value);
    setAnchorEl(null);
  }, []);

  const data = useMemo(() => cashBreakdownData, []);

  return (
    <Card className="h-full">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gray-50 flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-5 h-5 text-brand-gray-400" />
            </div>
            <h3 className="text-base font-bold text-brand-gray-900">
              Cash Breakdown
            </h3>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLORS.incomeActive }}
                />
                <span className="text-xs text-brand-gray-500">Current Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLORS.expenseActive }}
                />
                <span className="text-xs text-brand-gray-500">Current Expenses</span>
              </div>
            </div>

            <button
              onClick={handleOpen}
              className="flex items-center gap-1.5 text-xs font-medium text-white bg-brand-gray-900 px-3.5 py-2 rounded-full hover:bg-brand-gray-800 transition-colors"
              aria-label="Filter chart period"
            >
              {filter} <ChevronDown className="w-3 h-3" />
            </button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleClose()}
              slotProps={{ paper: { sx: { borderRadius: 2, mt: 0.5 } } }}
            >
              {["12 MONTHS", "6 MONTHS", "3 MONTHS"].map((opt) => (
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
        </div>

        <div className="w-full h-[300px] sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 30, right: 10, left: -10, bottom: 0 }}
              barCategoryGap="18%"
              stackOffset="sign"
            >
              <Customized component={renderHatchPatterns} />
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={<CustomXAxisTick />}
                dy={4}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                tickFormatter={(v) => {
                  if (v === 0) return "0k";
                  return `${v / 1000}k`;
                }}
                domain={[-30000, 30000]}
                ticks={[-30000, -15000, 0, 15000, 30000]}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(0,0,0,0.03)", radius: 6 }}
              />
              <Bar
                dataKey="income"
                stackId="cash"
                maxBarSize={40}
                shape={<TopRoundedBar />}
              >
                <LabelList content={<AnnotationLabel />} />
                {data.map((entry) => (
                  <Cell
                    key={entry.month}
                    fill={
                      entry.month === HIGHLIGHT_MONTH
                        ? "url(#hatch-income-active)"
                        : "url(#hatch-income)"
                    }
                  />
                ))}
              </Bar>
              <Bar
                dataKey="expenses"
                stackId="cash"
                maxBarSize={40}
                shape={<BottomRoundedBar />}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.month}
                    fill={
                      entry.month === HIGHLIGHT_MONTH
                        ? "url(#hatch-expense-active)"
                        : "url(#hatch-expense)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
});

export default CashBreakdownChart;
