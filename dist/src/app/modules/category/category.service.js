import { prisma } from "../../../lib/prisma";
//===============Create Category===============
const createCategory = async (data) => {
    const result = await prisma.medicineCategory.create({
        data,
    });
    return result;
};
//===============Get all Categories===============
const getAllCategories = async () => {
    const result = await prisma.medicineCategory.findMany();
    return result;
};
export const categoryService = {
    createCategory,
    getAllCategories,
};
//# sourceMappingURL=category.service.js.map