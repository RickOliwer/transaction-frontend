export type TransactionItem = {
  date: string;
  recipientId: number;
  description: string;
  amount: number;
};

interface TransactionsRes {
  data: TransactionItem[];
  total: number;
}

export async function fetchTransactions({
  page,
  start,
  end,
  size = 10,
}: {
  page: number;
  start?: string;
  end?: string;
  size?: number;
}): Promise<{
  transactions: Item[];
  total: number;
  hasMore: boolean;
  totalPages: number;
}> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    if (start) params.append("start", start);
    if (end) params.append("end", end);

    const res = await fetch(
      `http://localhost:8080/api/transactions?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch data from api, statusCode: ${res.status})`
      );
    }

    const data: TransactionsRes = await res.json();

    const totalPages = Math.ceil(data.total / size);
    const hasMore = page < totalPages - 1;

    return {
      transactions: data.data,
      total: data.total,
      hasMore,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);

    throw error;
  }
}
