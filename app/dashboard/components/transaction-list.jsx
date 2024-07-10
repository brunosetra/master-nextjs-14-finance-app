import TransactionItem from "@/components/transaction-item";

export default async function TransactionList() {
  const response = await fetch("http://localhost:3100/transactions");
  const transactions = await response.json();

  return (
    <section className="space-y-2">
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          <TransactionItem {...transaction} />
        </div>
      ))}
    </section>
  );
}
