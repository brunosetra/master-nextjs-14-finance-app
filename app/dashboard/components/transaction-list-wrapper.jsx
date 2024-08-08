import { findTransactions } from "@/lib/actions";
import TransactionList from "./transaction-list";

export default async function TransactionListWrapper({ range }) {
  const transactions = await findTransactions(range);

  return (
    <TransactionList
      initialTransactions={transactions}
      key={range}
      range={range}
    />
  );
}
