import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { adminService } from "./admin.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { UserRole, UserStatus } from "../../../../generated/prisma/enums";
import { userFilterableFields } from "./admin.constant";
import pick from "../../../shared/pick";

//===============Get All Users===============
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await adminService.getAllUsers(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Users data fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

//===============Update User Status===============
const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const currentUserId = req.user?.id as string;
  const updatedStatus = req.body.status as UserStatus;
  const result = await adminService.updateUserStatus(
    id,
    currentUserId,
    updatedStatus,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User status updated successfully",
    data: result,
  });
});

//==============Update User Role=================
const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const updatedRole = req.body.role as UserRole;
  const currentUserId = req.user?.id as string;
  const result = await adminService.updateUserRole(
    id,
    currentUserId,
    updatedRole,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User status updated successfully",
    data: result,
  });
});

export const adminController = {
  getAllUsers,
  updateUserStatus,
  updateUserRole,
};
