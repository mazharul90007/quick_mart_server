import catchAsync from "../../../shared/catchAsync";
import { cartService } from "./cart.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
//=================Add Item to cart==================
const addItemToCart = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const medicineId = req.params.id;
    const result = await cartService.addItemToCart(userId, medicineId);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Item has been added to cart successfully",
        data: result,
    });
});
//=================Get My Cart==================
const getMyCart = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const result = await cartService.getMyCart(userId);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Cart items fetched successfully",
        data: result,
    });
});
//=================Remove Item from Cart==================
const removeFromCart = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const cartItemId = req.params.id;
    const result = await cartService.removeFromCart(userId, cartItemId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Item removed from cart",
        data: result,
    });
});
//=================Update Cart item quantity==================
const updateCartItemQuantity = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const cartItemId = req.params.id;
    const { type } = req.body;
    const result = await cartService.updateCartItemQuantity(userId, cartItemId, type);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: `Quantity ${type}ed successfully`,
        data: result,
    });
});
export const cartController = {
    addItemToCart,
    getMyCart,
    removeFromCart,
    updateCartItemQuantity,
};
//# sourceMappingURL=cart.controller.js.map