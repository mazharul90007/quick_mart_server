import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { medicineService } from "./medicine.service";
import { IcreateMedicine } from "./medicine.type";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { IauthUser } from "../../../types/common";
import pick from "../../../shared/pick";
import { medicineFilterableFields } from "./medicine.constant";

//==============Create medicine=================
const createMedicine = catchAsync(async (req: Request, res: Response) => {
  const medicineData = req.body;
  const sellerId = req.user?.id;
  const payload = { ...medicineData, sellerId };

  const result = await medicineService.createMedicine(
    payload as IcreateMedicine,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Medicine created successfully",
    data: result,
  });
});

//================Get all medicines with pagination & filters =================
const getAllMedicines = catchAsync(async (req: Request, res: Response) => {
  //extract related filters
  const filters = pick(req.query, medicineFilterableFields);

  //extract pagination options
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await medicineService.getAllMedicines(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Medicines fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

//============Get medicine by Id===============
const getMedicineById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await medicineService.getMedicineById(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Medicine data fetched successfully",
    data: result,
  });
});

//============Update medicine by Id===========
const updateMedicine = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const sellerId = req.user?.id as string;
  const payload = req.body;
  const result = await medicineService.updateMedicine(id, sellerId, payload);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Medicine data updated successfully",
    data: result,
  });
});

//============Remove medicine by Id===========
const removeMedicine = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const currentUser = req.user as IauthUser;

  await medicineService.removeMedicine(id, currentUser);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Medicine removed successfully",
    data: null,
  });
});//================Get Seller Medicines =================
const getSellerMedicines = catchAsync(async (req: Request, res: Response) => {
  const sellerId = req.user?.id as string;

  //extract related filters
  const filters = pick(req.query, medicineFilterableFields);

  //extract pagination options
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await medicineService.getSellerMedicines(
    sellerId,
    filters,
    options,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Seller medicines fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});


export const medicineController = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  removeMedicine,
  getSellerMedicines,
};
