import { UserRole } from "../../../../generated/prisma/enums";
import { prisma } from "../../../lib/prisma";
import calculatePagination from "../../helpers/paginationHelpers";
import { medicineSearchableFields } from "./medicine.constant";
//==============Create medicine=================
const createMedicine = async (payload) => {
    //check if category exist
    await prisma.medicineCategory.findFirstOrThrow({
        where: { id: payload.categoryId },
    });
    const result = await prisma.medicine.create({
        data: payload,
    });
    return result;
};
//================Get all medicines with pagination & filters =================
const getAllMedicines = async (filters, options) => {
    const { searchTerm, minPrice, maxPrice, categoryId, popular } = filters;
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
    const where = {};
    //search logic
    if (searchTerm) {
        where.OR = medicineSearchableFields.map((field) => ({
            [field]: {
                contains: searchTerm,
                mode: "insensitive",
            },
        }));
    }
    //Price filtering
    if (minPrice || maxPrice) {
        where.price = {
            gte: minPrice ? Number(minPrice) : undefined,
            lte: maxPrice ? Number(maxPrice) : undefined,
        };
    }
    //Category filtere
    if (categoryId) {
        where.categoryId = categoryId;
    }
    //Popular filter
    if (popular !== undefined) {
        where.popular = popular === "true" || popular === true;
    }
    //Now fetch data with pagination and sorting
    const result = await prisma.medicine.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            category: true,
        },
    });
    const total = await prisma.medicine.count({ where });
    return {
        meta: { page, limit, total },
        data: result,
    };
};
//============Get medicine by Id===============
const getMedicineById = async (id) => {
    const result = await prisma.medicine.findUnique({
        where: { id },
        include: {
            seller: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            category: {
                select: {
                    categoryName: true,
                    categoryDetails: true,
                },
            },
        },
    });
    return result;
};
//============Update medicine by Id===========
const updateMedicine = async (id, sellerId, payload) => {
    //check existing medicine
    const existingMedicine = await prisma.medicine.findUniqueOrThrow({
        where: { id },
    });
    //check ownership
    if (existingMedicine.sellerId !== sellerId) {
        throw new Error("You are not authorized to update this medicine");
    }
    const result = await prisma.medicine.update({
        where: {
            id: existingMedicine.id,
        },
        data: payload,
    });
    return result;
};
//============Remove medicine by Id===========
const removeMedicine = async (id, currentUser) => {
    //check existing medicine
    const existingMedicine = await prisma.medicine.findUnique({
        where: { id },
    });
    if (!existingMedicine) {
        throw new Error("Medicine not found");
    }
    //check ownership
    const isOwner = existingMedicine.sellerId === currentUser.id;
    const isAdmin = currentUser.role === UserRole.ADMIN;
    if (!isOwner && !isAdmin) {
        throw new Error("You are not authorized to delete this medicine");
    }
    await prisma.medicine.delete({
        where: { id },
    });
};
//============Get Seller Medicines===========
const getSellerMedicines = async (sellerId, filters, options) => {
    const { searchTerm, minPrice, maxPrice, categoryId, popular } = filters;
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
    const where = {
        sellerId,
    };
    //search logic
    if (searchTerm) {
        where.OR = medicineSearchableFields.map((field) => ({
            [field]: {
                contains: searchTerm,
                mode: "insensitive",
            },
        }));
    }
    //Price filtering
    if (minPrice || maxPrice) {
        where.price = {
            gte: minPrice ? Number(minPrice) : undefined,
            lte: maxPrice ? Number(maxPrice) : undefined,
        };
    }
    //Category filtere
    if (categoryId) {
        where.categoryId = categoryId;
    }
    //Popular filter
    if (popular !== undefined) {
        where.popular = popular === "true" || popular === true;
    }
    const result = await prisma.medicine.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            category: true,
        },
    });
    const total = await prisma.medicine.count({ where });
    return {
        meta: { page, limit, total },
        data: result,
    };
};
export const medicineService = {
    createMedicine,
    getAllMedicines,
    getMedicineById,
    updateMedicine,
    removeMedicine,
    getSellerMedicines,
};
//# sourceMappingURL=medicine.service.js.map