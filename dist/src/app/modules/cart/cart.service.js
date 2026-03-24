import { prisma } from "../../../lib/prisma";
//=================Add Item to cart==================
const addItemToCart = async (userId, medicineId) => {
    return await prisma.$transaction(async (tx) => {
        //ensure the user has a cart
        let cart = await tx.cart.findUnique({
            where: { userId },
        });
        if (!cart) {
            cart = await tx.cart.create({
                data: { userId },
            });
        }
        //check if the item is already in the cart
        const existingCartItem = await tx.cartItem.findFirst({
            where: {
                cartId: cart.id,
                medicineId: medicineId,
            },
        });
        if (existingCartItem) {
            //if exist cart item then update quantity
            return await tx.cartItem.update({
                where: { id: existingCartItem.id },
                data: {
                    quantity: existingCartItem.quantity + 1,
                },
            });
        }
        else {
            // if new then create a cart item
            return await tx.cartItem.create({
                data: {
                    cartId: cart.id,
                    medicineId: medicineId,
                    quantity: 1,
                },
            });
        }
    });
};
//=================Get My Cart==================
const getMyCart = async (userId) => {
    const result = await prisma.cart.findUnique({
        where: {
            userId,
        },
        include: {
            cartItems: {
                include: {
                    medicine: {
                        select: {
                            name: true,
                            generic_name: true,
                            strength: true,
                            company: true,
                            photoUrl: true,
                            quantity: true,
                            price: true,
                        },
                    },
                },
            },
        },
    });
    return result;
};
//=================Remove Item from Cart==================
const removeFromCart = async (userId, cartItemId) => {
    // verify ownership
    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id: cartItemId,
            cart: {
                userId: userId,
            },
        },
    });
    if (!cartItem) {
        throw new Error("Item not found in your cart");
    }
    // delete item from cart
    const result = await prisma.cartItem.delete({
        where: {
            id: cartItemId,
        },
    });
    return result;
};
//=================Update Cart item quantity==================
const updateCartItemQuantity = async (userId, cartItemId, type) => {
    //verify ownership
    const cartItem = await prisma.cartItem.findFirstOrThrow({
        where: {
            id: cartItemId,
            cart: { userId },
        },
    });
    //Prevent quantity from going below 1
    if (type === "decrement" && cartItem.quantity <= 1) {
        throw new Error("Quantity cannot be less than 1. Use remove instead.");
    }
    //Update the quantity
    let result;
    if (type === "increment") {
        result = await prisma.cartItem.update({
            where: { id: cartItemId },
            data: {
                quantity: { increment: 1 },
            },
        });
    }
    else {
        result = await prisma.cartItem.update({
            where: { id: cartItemId },
            data: {
                quantity: { decrement: 1 },
            },
        });
    }
    return result;
};
export const cartService = {
    addItemToCart,
    getMyCart,
    removeFromCart,
    updateCartItemQuantity,
};
//# sourceMappingURL=cart.service.js.map