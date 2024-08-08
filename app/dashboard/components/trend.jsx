import Trend from "@/components/trend";
import { getTrendTotal } from "@/lib/actions";

export default async function TrendItem({ type, range }) {
  const { amount, prevAmount } = await getTrendTotal(type, range);

  return <Trend amount={amount} prevAmount={prevAmount} type={type} />;
}
