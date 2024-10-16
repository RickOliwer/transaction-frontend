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
      <TableCaption>En lista över transaktioner.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[182px] w-[222px]">Datum</TableHead>
          <TableHead className="min-w-[182px] w-[222px]">Kontotext</TableHead>
          <TableHead>Insättning</TableHead>
          <TableHead className="text-right">Uttag</TableHead>
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
