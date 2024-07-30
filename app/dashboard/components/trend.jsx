import Trend from "@/components/trend";

export default async function TrendItem({ type }) {
  const response = await fetch(`${process.env.API_URL}/trends/${type}`, {
    cache: "no-store",
  });
  const { amount, prevAmount } = await response.json();

  return <Trend amount={amount} prevAmount={prevAmount} type={type} />;
}
