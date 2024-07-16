import TransactionForm from "../../components/transaction-from";

export const metadata = {
  title: "Add Transaction",
};

export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Add Transaction</h1>
      <TransactionForm />
    </>
  );
}
