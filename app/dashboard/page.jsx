import { Suspense } from "react";
import TransactionList from "./components/transaction-list";
import TransactionListFallback from "./components/transaction-list-fallback";
import TrendItem from "./components/trend";
import TrendItemFallback from "./components/trend-fallback";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { sizes, variants } from "@/lib/variants";

export default function Page() {
  return (
    <>
      <section className="mb-8">
        <h1 className="text-4xl font-semibold">Summary</h1>
      </section>
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Suspense fallback={<TrendItemFallback />}>
          <TrendItem amount={2000} prevAmount={3000} type={"Income"} />
        </Suspense>
        <Suspense fallback={<TrendItemFallback />}>
          <TrendItem amount={2000} prevAmount={3000} type={"Expense"} />
        </Suspense>
        <Suspense fallback={<TrendItemFallback />}>
          <TrendItem amount={2000} prevAmount={3000} type={"Saving"} />
        </Suspense>
        <Suspense fallback={<TrendItemFallback />}>
          <TrendItem amount={2000} prevAmount={3000} type={"Investiment"} />
        </Suspense>
      </section>
      <section className="flex justify-between items-center mb-8">
        <h2 className="text-2xl">Transactions</h2>
        <Link
          href="/dashboard/transaction/add"
          className={`flex items-center space-x-1 ${variants["ghost"]} ${sizes["sm"]}`}
        >
          <PlusCircle className="w-4 h-4" />
          <div>Add</div>
        </Link>
      </section>

      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>

      <section className="mt-16">
        <Link href="/">Go to Home</Link>
      </section>
    </>
  );
}
