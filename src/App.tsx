import { fetchTransactions } from "@/api/transactions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "./components/ui/button";
import TransactionList from "./components/transaction-list";
import CardWrapper from "./components/card-wrapper";

function App() {
  const [page, setPage] = useState(0);

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["projects", page],
      queryFn: () => fetchTransactions({ page }),
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
          <TransactionList transactions={data.transactions} />
        )}
        <span>Current Page: {page + 1}</span>
        <Button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => {
            if (!isPlaceholderData && data?.hasMore) {
              setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPlaceholderData || !data?.hasMore}
        >
          Next Page
        </Button>
        {isFetching ? <span> Loading...</span> : null}
      </CardWrapper>
    </div>
  );
}

export default App;
