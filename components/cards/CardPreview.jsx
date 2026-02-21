"use client";

import React, { useState, useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ChevronDown, Wifi } from "lucide-react";

const CardPreview = React.memo(function CardPreview() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Card className="h-full">
      <CardContent className="p-5 sm:p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-brand-gray-700">My Card</h3>
          <button
            onClick={handleOpen}
            className="flex items-center gap-1 text-xs font-medium text-brand-gray-500 bg-brand-gray-50 px-2.5 py-1.5 rounded-full hover:bg-brand-gray-100 transition-colors"
            aria-label="Card options"
          >
            SEE ALL <ChevronDown className="w-3 h-3" />
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            slotProps={{ paper: { sx: { borderRadius: 2, mt: 0.5 } } }}
          >
            <MenuItem onClick={handleClose} sx={{ fontSize: "0.75rem" }}>
              View All Cards
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ fontSize: "0.75rem" }}>
              Add New Card
            </MenuItem>
          </Menu>
        </div>

        <div className="relative w-full aspect-[1.75/1] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-gray-800 via-brand-gray-900 to-brand-gray-800 p-5 flex flex-col justify-between shadow-lg">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10" />
          </div>

          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Visa</p>
              <p className="text-lg font-bold text-white mt-0.5">VISA</p>
            </div>
            <Wifi className="w-6 h-6 text-white/70 rotate-90" />
          </div>

          <div className="relative z-10">
            <p className="text-sm font-semibold text-white">Henry Norman</p>
            <p className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
              VALID UNTILL
            </p>
          </div>

          <div className="flex items-center justify-between relative z-10">
            <p className="text-xs sm:text-sm font-mono text-white/80 tracking-[0.2em]">
              5412 &nbsp;7512 &nbsp;3412 &nbsp;3456
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default CardPreview;
