import { fetchTransactions } from "@/api/transactions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TransactionList from "./components/transactions/transaction-list";
import CardWrapper from "./components/transactions/card-wrapper";
import PaginationController from "./components/transactions/pagination-controller";
import { DateRange } from "react-day-picker";
import { DatePicker } from "./components/transactions/date-picker";
import { formatDate } from "./lib/utils/date";

function App() {
  const [page, setPage] = useState(0);

  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const startDate = formatDate(date?.from);
  const endDate = formatDate(date?.to);

  useEffect(() => {
    if (startDate && endDate) {
      setPage(0);
    }
  }, [startDate, endDate]);

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["transactions", page, startDate, endDate],
      queryFn: () =>
        fetchTransactions({ page, start: startDate, end: endDate }),
      placeholderData: keepPreviousData,
    });

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
              <DatePicker date={date} setDate={setDate} />
              <div>
                <PaginationController
                  setPage={setPage}
                  page={page}
                  hasMore={data?.hasMore}
                  isPlaceholderData={isPlaceholderData}
                />
              </div>
            </div>
            <TransactionList transactions={data.transactions} />

            {isFetching && <p>is fetching</p>}
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
