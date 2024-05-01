"use client";

import { GetHistoryPediodsResponseType } from "@/app/api/history-periods/route";
import SkeletonWrapper from "@/components/SkletonWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Period, TimeFrame } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface Props {
  isPeriod: Period;
  setIsPeriod: (isPeriod: Period) => void;
  isTimeFrame: TimeFrame;
  setisTimeFrame: (isTimeFrame: TimeFrame) => void;
}

const HistoryPeriodSelector = ({
  isPeriod,
  setIsPeriod,
  isTimeFrame,
  setisTimeFrame,
}: Props) => {
  const historyPeriods = useQuery<GetHistoryPediodsResponseType>({
    queryKey: ["overview", "history", "priods"],
    queryFn: () => fetch(`/api/history-periods`).then((res) => res.json()),
  });

  return (
    <div className="flex flex-wrap items-center gap-4">
      <SkeletonWrapper isLoading={historyPeriods.isFetching} fullWidth={false}>
        <Tabs
          value={isTimeFrame}
          onValueChange={(value) => setisTimeFrame(value as TimeFrame)}
        >
          <TabsList>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </SkeletonWrapper>

      <div className="flex flex-wrap items-center gap-2">
        <SkeletonWrapper
          isLoading={historyPeriods.isFetching}
          fullWidth={false}
        >
          <YearSelector
            isPeriod={isPeriod}
            setIsPeriod={setIsPeriod}
            years={historyPeriods.data || []}
          />
        </SkeletonWrapper>

        {isTimeFrame === "month" && (
          <SkeletonWrapper
            isLoading={historyPeriods.isFetching}
            fullWidth={false}
          >
            <MonthSelector isPeriod={isPeriod} setIsPeriod={setIsPeriod} />
          </SkeletonWrapper>
        )}
      </div>
    </div>
  );
};

export default HistoryPeriodSelector;

// Tahun
function YearSelector({
  isPeriod,
  setIsPeriod,
  years,
}: {
  isPeriod: Period;
  setIsPeriod: (period: Period) => void;
  years: GetHistoryPediodsResponseType;
}) {
  return (
    <Select
      value={isPeriod.year.toString()}
      onValueChange={(value) => {
        setIsPeriod({
          month: isPeriod.month,
          year: parseInt(value),
        });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Bulan
function MonthSelector({
  isPeriod,
  setIsPeriod,
}: {
  isPeriod: Period;
  setIsPeriod: (period: Period) => void;
}) {
  return (
    <Select
      value={isPeriod.month.toString()}
      onValueChange={(value) => {
        setIsPeriod({
          year: isPeriod.year,
          month: parseInt(value),
        });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
          const monthStr = new Date(isPeriod.year, month, 1).toLocaleString(
            "default",
            { month: "long" }
          );

          return (
            <SelectItem key={month} value={month.toString()}>
              {monthStr}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
