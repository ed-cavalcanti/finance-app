export const amountFormater = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const baseDateFormater = (date: Date) => {
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
  });
};