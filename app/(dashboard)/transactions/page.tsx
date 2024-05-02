"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constant";
import { differenceInDays, startOfMonth } from "date-fns";
import React, { useState } from "react";
import { toast } from "sonner";
import TransactionTable from "./_components/TransactionTable";

const TransactionsPage = () => {
  const [isDateRange, setIsDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <>
      {/* ---------- HEADER ---------- */}
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold">Transactions History</p>
          </div>
        </div>

        <DateRangePicker
          initialDateFrom={isDateRange.from}
          initialDateTo={isDateRange.to}
          showCompare={false}
          onUpdate={(values) => {
            const { from, to } = values.range;
            // Perbaharui rentang tanggal hanya jika kedua tangga di gunakaan

            if (!from || !to) return;
            if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
              toast.error(
                `The selected date range is to big. Max allowe range is ${MAX_DATE_RANGE_DAYS} days!`
              );
              return;
            }

            setIsDateRange({ from, to });
          }}
        />
      </div>
      {/* ---------- END HEDER ---------- */}

      <div className="container">
        <TransactionTable from={isDateRange.from} to={isDateRange.to} />
      </div>
    </>
  );
};

export default TransactionsPage;
