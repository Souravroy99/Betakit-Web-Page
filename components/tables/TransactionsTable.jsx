"use client";

import React, { useMemo, useCallback, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Search,
  ChevronDown,
  MoreHorizontal,
  Figma,
  Palette,
  Music,
  Cloud,
  Globe,
} from "lucide-react";
import { transactions } from "@/lib/chartData";

const iconMap = {
  figma: Figma,
  adobe: Palette,
  spotify: Music,
  cloud: Cloud,
  google: Globe,
};

const iconBgMap = {
  figma: "bg-purple-50",
  adobe: "bg-red-50",
  spotify: "bg-green-50",
  cloud: "bg-orange-50",
  google: "bg-blue-50",
};

const iconColorMap = {
  figma: "text-purple-600",
  adobe: "text-red-600",
  spotify: "text-green-600",
  cloud: "text-orange-600",
  google: "text-blue-600",
};

const TransactionRow = React.memo(function TransactionRow({ row }) {
  const IconComp = iconMap[row.icon] ?? Globe;

  return (
    <TableRow hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
      <TableCell>
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
              iconBgMap[row.icon] ?? "bg-brand-gray-50"
            }`}
          >
            <IconComp
              className={`w-4 h-4 ${iconColorMap[row.icon] ?? "text-brand-gray-500"}`}
            />
          </div>
          <span className="text-sm font-medium text-brand-gray-800 whitespace-nowrap">
            {row.activity}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm text-brand-gray-500">{row.orderId}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm text-brand-gray-500 whitespace-nowrap">{row.date}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm text-brand-gray-500 whitespace-nowrap">{row.time}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm font-bold text-brand-gray-700 tracking-wide">
          {row.method.toUpperCase()}
        </span>
      </TableCell>
      <TableCell>
        <Chip
          label={row.status}
          size="small"
          sx={{
            bgcolor: row.status === "Completed" ? "#E8F5F0" : "#FEF3C7",
            color: row.status === "Completed" ? "#16A37F" : "#D97706",
            fontWeight: 600,
            fontSize: "0.7rem",
            height: 24,
            "& .MuiChip-label": { px: 1.5 },
          }}
        />
      </TableCell>
      <TableCell>
        <span className="text-sm font-semibold text-brand-gray-800">
          ${row.amount.toLocaleString()}
        </span>
      </TableCell>
      <TableCell align="right" sx={{ pr: 1 }}>
        <button
          className="p-1.5 rounded-lg hover:bg-brand-gray-50 transition-colors"
          aria-label={`More options for ${row.activity}`}
        >
          <MoreHorizontal className="w-4 h-4 text-brand-gray-400" />
        </button>
      </TableCell>
    </TableRow>
  );
});

const TransactionsTable = React.memo(function TransactionsTable() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewFilter, setViewFilter] = useState("VIEW ALL");

  const handleOpen = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback((value) => {
    if (value) setViewFilter(value);
    setAnchorEl(null);
  }, []);

  const data = useMemo(() => transactions, []);

  return (
    <Card>
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-base font-semibold text-brand-gray-900">
            Transactions History
          </h3>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-gray-400" />
              <input
                type="text"
                placeholder="SEARCH"
                aria-label="Search transactions"
                className="pl-8 pr-3 py-1.5 text-xs bg-brand-gray-50 border border-brand-gray-200 rounded-full w-28 sm:w-32 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal placeholder:text-brand-gray-400 placeholder:font-semibold placeholder:tracking-wider transition-colors"
              />
            </div>

            <button
              onClick={handleOpen}
              className="flex items-center gap-1 text-xs font-medium text-brand-gray-600 bg-brand-gray-50 border border-brand-gray-200 px-3 py-1.5 rounded-full hover:bg-brand-gray-100 transition-colors"
              aria-label="Filter transactions view"
            >
              {viewFilter} <ChevronDown className="w-3 h-3" />
            </button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleClose()}
              slotProps={{ paper: { sx: { borderRadius: 2, mt: 0.5 } } }}
            >
              {["VIEW ALL", "COMPLETED", "PENDING"].map((opt) => (
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

        <TableContainer>
          <Table size="small" aria-label="Transactions history">
            <TableHead>
              <TableRow>
                <TableCell>Activity</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell align="right" sx={{ pr: 1 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TransactionRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
});

export default TransactionsTable;
