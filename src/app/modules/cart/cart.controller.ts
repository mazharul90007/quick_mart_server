import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { cartService } from "./cart.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

//=================Add Item to cart==================
const addItemToCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const medicineId = req.params.id as string;

  const result = await cartService.addItemToCart(userId, medicineId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Item has been added to cart successfully",
    data: result,
  });
});

//=================Get My Cart==================
const getMyCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const result = await cartService.getMyCart(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Cart items fetched successfully",
    data: result,
  });
});

//=================Remove Item from Cart==================
const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const cartItemId = req.params.id as string;
  const result = await cartService.removeFromCart(userId, cartItemId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Item removed from cart",
    data: result,
  });
});

//=================Update Cart item quantity==================
const updateCartItemQuantity = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const cartItemId = req.params.id as string;
    const { type } = req.body;

    const result = await cartService.updateCartItemQuantity(
      userId,
      cartItemId,
      type,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Quantity ${type}ed successfully`,
      data: result,
    });
  },
);

export const cartController = {
  addItemToCart,
  getMyCart,
  removeFromCart,
  updateCartItemQuantity,
};
