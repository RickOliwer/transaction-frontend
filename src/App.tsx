import { fetchTransactions } from "@/api/transactions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function App() {
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["items"],
      queryFn: fetchTransactions,
      initialPageParam: 0,
      getNextPageParam: (lastPage: any) => lastPage.nextPage,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  console.log("data CLIENT", data);
  return status === "pending" ? (
    <div>Loading...</div>
  ) : status === "error" ? (
    <div>{error.message}</div>
  ) : (
    <div className="flex flex-col gap-2">
      {data.pages.map((page: any) => {
        return (
          <div key={page.currentPage} className="flex flex-col gap-2">
            {page.data.map((item: any, index: number) => {
              return (
                <div key={index} className="rounded-md bg-gray-700 p-4">
                  {item.description}
                </div>
              );
            })}
          </div>
        );
      })}

      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
}

export default App;
