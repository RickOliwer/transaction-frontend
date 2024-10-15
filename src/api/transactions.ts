type Item = {
  date: string;
  recipientId: number;
  description: string;
  amount: number;
};

const LIMIT = 10;

export async function fetchTransactions({
  pageParam,
}: {
  pageParam: number;
}): Promise<{
  data: Item[];
  currentPage: number;
  nextPage: number | null;
}> {
  const res = await fetch(
    `http://localhost:8080/api/transactions?page=${pageParam}&size=${LIMIT}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("my res ==>", res);

  const data = await res.json();

  const items: any[] = [];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data,
        currentPage: pageParam,
        nextPage: pageParam + LIMIT < items.length ? pageParam + LIMIT : null,
      });
    }, 1000);
  });
}
