import Skeleton from "@/components/skeleton";

export default function TransactionListFallback() {
  return (
    <div className="space-y-4">
      <TransactionItemSkeleton />
      <TransactionItemSkeleton />
      <TransactionItemSkeleton />
      <TransactionItemSkeleton />
      <TransactionItemSkeleton />
    </div>
  );
}

function TransactionItemSkeleton() {
  return (
    <div className="w-full flex items-center space-x-2">
      <div className="flex items-center mr-4 grow">
        <Skeleton />
      </div>
      <div className="min-w-[150px] items-center hidden md:flex">
        <Skeleton />
      </div>

      <div className="min-w-[70px]">
        <Skeleton />
      </div>
      <div className="min-w-[50px]">
        <Skeleton />
      </div>
    </div>
  );
}
