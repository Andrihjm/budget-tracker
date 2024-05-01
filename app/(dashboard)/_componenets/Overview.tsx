"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constant";
import { UserSettings } from "@prisma/client";
import { differenceInDays, startOfMonth } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import StatsCards from "./StatsCards";
import CategoriesStats from "./CategoriesStats";

const Overview = ({ userSettings }: { userSettings: UserSettings }) => {
  const [isDateRange, setIsDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  return (
    <>
      <div className="container flex flex-wrap items-end justify-between gap-2 py-6">
        <h1 className="text-3xl font-bold">Overview</h1>

        <div className="flex items-center gap-3">
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
      </div>

      <div className="container w-full flex flex-col gap-2">
        <StatsCards
          userSettings={userSettings}
          from={isDateRange.from}
          to={isDateRange.to}
        />

        <CategoriesStats
          userSettings={userSettings}
          from={isDateRange.from}
          to={isDateRange.to}
        />
      </div>
    </>
  );
};

export default Overview;
