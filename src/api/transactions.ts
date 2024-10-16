type Item = {
  date: string;
  recipientId: number;
  description: string;
  amount: number;
};

const LIMIT = 10;

export async function fetchTransactions({
  page,
  start,
  end,
}: {
  page: number;
  start?: string;
  end?: string;
}): Promise<{
  transactions: Item[];
  total: number;
  hasMore: boolean;
  totalPages: number;
}> {
  const res = await fetch(
    `http://localhost:8080/api/transactions?page=${page}&size=${LIMIT}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  const totalPages = Math.ceil(data?.total / LIMIT);

  const hasMore = page < totalPages - 1;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        transactions: data?.data,
        total: data?.total,
        hasMore: hasMore,
        totalPages: totalPages,
      });
    }, 1000);
  });
}
