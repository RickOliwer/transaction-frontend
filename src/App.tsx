import { fetchTransactions } from "@/api/transactions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "./components/ui/button";

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
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.transactions.map((transaction, index: number) => (
            <p key={index}>{transaction.description}</p>
          ))}
        </div>
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
    </div>
  );
}

export default App;
