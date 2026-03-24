import catchAsync from "../../../shared/catchAsync";
import { categoryService } from "./category.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
//===============Create Category===============
const createCategory = catchAsync(async (req, res) => {
    const result = await categoryService.createCategory(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Category created successfully",
        data: result,
    });
});
//===============Get all Categories===============
const getAllCategories = catchAsync(async (req, res) => {
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
//# sourceMappingURL=category.controller.js.map