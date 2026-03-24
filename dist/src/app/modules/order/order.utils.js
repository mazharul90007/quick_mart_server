export const generatedOrderNo = () => {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    return `ORD-${randomNumber}`;
};
//# sourceMappingURL=order.utils.js.map