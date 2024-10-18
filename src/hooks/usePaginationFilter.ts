import { formatDate } from "@/lib/utils/date";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

interface UsePaginationFilterRes {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  startDate: string | undefined;
  endDate: string | undefined;
}

export function usePaginationFilter(): UsePaginationFilterRes {
  const [page, setPage] = useState(0);
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const startDate = formatDate(date?.from);
  const endDate = formatDate(date?.to);

  useEffect(() => {
    if (startDate && endDate) {
      setPage(0);
    }
  }, [startDate, endDate]);

  return { page, setPage, date, setDate, startDate, endDate };
}
