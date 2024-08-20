import TransactionForm from "@/app/dashboard/components/transaction-form";
import Skeleton from "@/components/skeleton";
import { getTransacion } from "@/lib/actions";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Transaction",
};
export default async function Page({ params: { id } }) {
  const { data: transaction, error } = await getTransacion(id);

  console.log("transaction", transaction);
  console.log("error", error);
  if (error) notFound();

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
      <TransactionForm initialData={transaction} />
    </>
  );
}
