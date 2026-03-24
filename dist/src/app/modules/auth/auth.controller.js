import catchAsync from "../../../shared/catchAsync";
import { authServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
//=================Get User by Id=============
const getUserById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const currentUser = req.user?.id;
    console.log(currentUser);
    const result = await authServices.getUserById(id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Current user data has been fetched",
        data: result,
    });
});
//=================Get my profile=============
const getMyProfile = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const result = await authServices.getMyProfile(userId);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "User profile data has been fetched",
        data: result,
    });
});
export const authControllers = {
    getUserById,
    getMyProfile,
};
//# sourceMappingURL=auth.controller.js.map