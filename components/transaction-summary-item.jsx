import { useFormatCurrency } from "@/hooks/use-format-currency";

export default function TransactionSummaryItem({ date, ammount = 0 }) {
  const formattedAmount = useFormatCurrency(ammount);
  return (
    <div className="flex text-gray-500 dark:text-gray-400 font-semibold">
      <div className="grow">{date}</div>
      <div className="min-w-[70px] text-right font-semibold">
        {formattedAmount}
      </div>
      <div className="min-w-[100px]"></div>
    </div>
  );
}
