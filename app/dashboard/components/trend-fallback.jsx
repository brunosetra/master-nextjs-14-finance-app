import Skeleton from "@/components/skeleton";

export default function TrendItemFallback() {
  return (
    <div className="space-y-5 w-2/5 lg:w-5/6">
      <div>
        <Skeleton />
      </div>
      <div className="mb-2">
        <Skeleton />
      </div>
      <div className="flex space-x-2">
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
}
