import { fetchTransactions } from "@/api/transactions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import TransactionList from "./components/transaction-list";
import CardWrapper from "./components/card-wrapper";
import PaginationController from "./components/pagination-controller";
import { DateRange } from "react-day-picker";
import { DatePicker } from "./components/date-picker";
import dayjs from "dayjs";

function formatDate(date: Date | undefined): string | undefined {
  if (!date) return undefined;
  return dayjs(date).format("YYYY-MM-DD");
}

function App() {
  const [page, setPage] = useState(0);

  // const [date, setDate] = useState<DateRange | undefined>({
  //   from: undefined,
  //   to: undefined,
  // });

  const [date, setDate] = useState<DateRange | undefined>();

  // Format the dates
  const startDate = formatDate(date?.from);
  const endDate = formatDate(date?.to);

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["projects", page, startDate, endDate],
      queryFn: () =>
        fetchTransactions({ page, start: startDate, end: endDate }),
      placeholderData: keepPreviousData,
    });

  console.log("do I get any data????", data);

  return (
    <div>
      <CardWrapper>
        {isPending ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p></p>
              <DatePicker date={date} setDate={setDate} />
            </div>
            <TransactionList transactions={data.transactions} />
          </>
        )}

        <PaginationController
          setPage={setPage}
          page={page}
          hasMore={data?.hasMore}
          isPlaceholderData={isPlaceholderData}
        />
      </CardWrapper>
    </div>
  );
}

export default App;
