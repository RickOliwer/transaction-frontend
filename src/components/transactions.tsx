import { useQuery } from "@tanstack/react-query";

const Transactions = () => {
  const { data } = useQuery({
    queryFn: () =>
      fetch("http://localhost:8080/api/transactions").then((res) => res.json()),
    queryKey: ["transaction"],
  });

  console.log("data", data);
  return (
    <div>
      <h2>Hello Transactions</h2>
      <ul>
        {data?.map((item: any) => {
          return <li>{item.description}</li>;
        })}
      </ul>
    </div>
  );
};

export default Transactions;
