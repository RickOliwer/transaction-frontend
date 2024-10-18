import { TransactionItem } from "@/api/transactions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TransactionList = ({
  transactions,
}: {
  transactions: TransactionItem[];
}) => {
  return (
    <Table>
      <TableCaption>A list of transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[182px] w-[222px]">Date</TableHead>
          <TableHead className="min-w-[182px] w-[222px]">Recipient</TableHead>
          <TableHead className="min-w-[182px] w-[222px]">
            Account text
          </TableHead>
          <TableHead>Deposit</TableHead>
          <TableHead className="text-right">Withdrawal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index: number) => {
          const amount = transaction.amount;
          const formatAmount = new Intl.NumberFormat("sv-SE", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
          }).format(Math.abs(amount));
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">{transaction.date}</TableCell>
              <TableCell className="font-medium">
                {transaction.category}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className="text-green-600">
                {amount > 0 ? formatAmount : ""}
              </TableCell>
              <TableCell className="text-right">
                {amount < 0 ? `-${formatAmount}` : ""}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionList;
