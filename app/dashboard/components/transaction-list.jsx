import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { createClient } from "@/lib/supabase/server";

const groupAnsSumTransactionByDate = (transactions) => {
  const grouped = {};

  transactions.forEach((t) => {
    const date = t.created_at.split("T")[0];
    if (!grouped[date]) {
      grouped[date] = { transactions: [], ammount: 0 };
    }

    grouped[date].transactions.push(t);
    grouped[date].ammount += t.type === "Expense" ? -t.amount : t.amount;
  });

  return grouped;
};

export default async function TransactionList() {
  const supabase = createClient();

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false });

  const grouped = groupAnsSumTransactionByDate(transactions);

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, { transactions, ammount }]) => (
        <div key={date}>
          <TransactionSummaryItem date={date} ammount={ammount} />
          <hr className=" my-4 border-gray-200 dark:border-gray-800" />
          <section className="space-y-2">
            {transactions.map((transaction) => (
              <div key={transaction.id}>
                <TransactionItem {...transaction} />
              </div>
            ))}
          </section>
        </div>
      ))}
    </div>
  );
}
