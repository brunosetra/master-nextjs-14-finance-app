export const groupAnsSumTransactionByDate = (transactions) => {
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
