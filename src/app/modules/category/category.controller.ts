import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { categoryService } from "./category.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { IcreateCategories } from "./category.interface";

//===============Create Category===============
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createCategory(
    req.body as IcreateCategories,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

//===============Get all Categories===============
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategories();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All Categories successfully",
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getAllCategories,
};
