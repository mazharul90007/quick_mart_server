import { prisma } from "../../../lib/prisma";
import calculatePagination from "../../helpers/paginationHelpers";
import { userSearchableFields } from "./admin.constant";
//===============Get All Users===============
const getAllUsers = async (filters, options) => {
    const { searchTerm, ...filterData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
    const where = {};
    if (searchTerm) {
        where.OR = userSearchableFields.map((field) => ({
            [field]: {
                contains: searchTerm,
                mode: "insensitive",
            },
        }));
    }
    if (Object.keys(filterData).length > 0) {
        Object.assign(where, filterData);
    }
    const result = await prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = await prisma.user.count({ where });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
//===============Update User Status===============
const updateUserStatus = async (id, currentUserId, status) => {
    //Find the targeted User
    const targetedUser = await prisma.user.findUnique({
        where: { id },
    });
    if (!targetedUser) {
        throw new Error("Sorry. Targeted User not found");
    }
    if (targetedUser.id === currentUserId) {
        throw new Error("Sorry. You can not change your own status");
    }
    const result = await prisma.user.update({
        where: { id },
        data: {
            status,
        },
    });
    return result;
};
//==============Update User Role=================
const updateUserRole = async (id, currentUserId, role) => {
    //Find the targeted User
    const targetedUser = await prisma.user.findUnique({
        where: { id },
    });
    if (!targetedUser) {
        throw new Error("Sorry. Targeted User not found");
    }
    if (targetedUser.id === currentUserId) {
        throw new Error("Sorry. You can not change your own role");
    }
    const result = await prisma.user.update({
        where: { id },
        data: {
            role,
        },
    });
    return result;
};
export const adminService = {
    getAllUsers,
    updateUserStatus,
    updateUserRole,
};
//# sourceMappingURL=admin.service.js.map