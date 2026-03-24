export declare const cartService: {
    addItemToCart: (userId: string, medicineId: string) => Promise<{
        id: string;
        quantity: number;
        medicineId: string;
        cartId: string;
    }>;
    getMyCart: (userId: string) => Promise<({
        cartItems: ({
            medicine: {
                name: string;
                generic_name: string | null;
                company: string;
                strength: string | null;
                photoUrl: string | null;
                quantity: number;
                price: number;
            };
        } & {
            id: string;
            quantity: number;
            medicineId: string;
            cartId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }) | null>;
    removeFromCart: (userId: string, cartItemId: string) => Promise<{
        id: string;
        quantity: number;
        medicineId: string;
        cartId: string;
    }>;
    updateCartItemQuantity: (userId: string, cartItemId: string, type: "increment" | "decrement") => Promise<{
        id: string;
        quantity: number;
        medicineId: string;
        cartId: string;
    }>;
};
//# sourceMappingURL=cart.service.d.ts.map