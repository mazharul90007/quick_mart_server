import catchAsync from "../../../shared/catchAsync";
import { medicineService } from "./medicine.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import pick from "../../../shared/pick";
import { medicineFilterableFields } from "./medicine.constant";
//==============Create medicine=================
const createMedicine = catchAsync(async (req, res) => {
    const medicineData = req.body;
    const sellerId = req.user?.id;
    const payload = { ...medicineData, sellerId };
    const result = await medicineService.createMedicine(payload);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Medicine created successfully",
        data: result,
    });
});
//================Get all medicines with pagination & filters =================
const getAllMedicines = catchAsync(async (req, res) => {
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
const getMedicineById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await medicineService.getMedicineById(id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Medicine data fetched successfully",
        data: result,
    });
});
//============Update medicine by Id===========
const updateMedicine = catchAsync(async (req, res) => {
    const id = req.params.id;
    const sellerId = req.user?.id;
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
const removeMedicine = catchAsync(async (req, res) => {
    const id = req.params.id;
    const currentUser = req.user;
    await medicineService.removeMedicine(id, currentUser);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Medicine removed successfully",
        data: null,
    });
}); //================Get Seller Medicines =================
const getSellerMedicines = catchAsync(async (req, res) => {
    const sellerId = req.user?.id;
    //extract related filters
    const filters = pick(req.query, medicineFilterableFields);
    //extract pagination options
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await medicineService.getSellerMedicines(sellerId, filters, options);
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
//# sourceMappingURL=medicine.controller.js.map