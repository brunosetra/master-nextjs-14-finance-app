import { useMemo } from "react";

export const useFormatCurrency = (amount) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);

  return useMemo(() => formatCurrency(amount), [amount]);
};
