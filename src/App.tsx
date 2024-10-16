import { fetchTransactions } from "@/api/transactions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import TransactionList from "./components/transaction-list";
import CardWrapper from "./components/card-wrapper";
import PaginationController from "./components/pagination-controller";

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
