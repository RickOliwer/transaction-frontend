import { fetchTransactions } from "@/api/transactions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import TransactionList from "./components/transactions/transaction-list";
import CardWrapper from "./components/transactions/card-wrapper";
import PaginationController from "./components/transactions/pagination-controller";
import { DatePicker } from "./components/transactions/date-picker";
import { usePaginationFilter } from "./hooks/usePaginationFilter";

function App() {
  const { page, setPage, date, setDate, startDate, endDate } =
    usePaginationFilter();

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
