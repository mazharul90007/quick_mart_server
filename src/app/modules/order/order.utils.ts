export const generatedOrderNo = (): string => {
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
  return `ORD-${randomNumber}`;
};
