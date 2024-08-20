"use client";
import Button from "@/components/button";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { findTransactions } from "@/lib/actions";
import { groupAnsSumTransactionByDate } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useState } from "react";

export default function TransactionList({ initialTransactions, range }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [morePagesAvailable, setMorePagesAvailable] = useState(true);

  const [loadingData, setLoadingData] = useState(false);

  const grouped = groupAnsSumTransactionByDate(transactions);

  const handleLoadMore = async () => {
    setLoadingData(true);

    try {
      const fetchedTransactions = await findTransactions(
        range,
        transactions.length,
        10
      );

      fetchedTransactions.length > 0 &&
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          ...fetchedTransactions,
        ]);

      setMorePagesAvailable(fetchedTransactions.length === 10);
    } finally {
      setLoadingData(false);
    }
  };

  const handleRemoved = (id) => {
    setTransactions((prevTransactions) =>
      [...prevTransactions].filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, { transactions, ammount }]) => (
        <div key={date}>
          <TransactionSummaryItem date={date} ammount={ammount} />
          <hr className=" my-4 border-gray-200 dark:border-gray-800" />
          <section className="space-y-2">
            {transactions.map((transaction) => (
              <div key={transaction.id}>
                <TransactionItem
                  {...transaction}
                  onRemoved={() => handleRemoved(transaction.id)}
                />
              </div>
            ))}
          </section>
        </div>
      ))}
      {transactions.length === 0 && (
        <div className="text-center text-gray-400 dark:text-gray-500">
          No transactions found
        </div>
      )}

      {transactions.length !== 0 && morePagesAvailable && (
        <div
          className="flex items-center justify-center"
          onClick={handleLoadMore}
        >
          <Button variant="outline" size="sm" disabled={loadingData}>
            {loadingData ? <Loader className="animate-spin" /> : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
