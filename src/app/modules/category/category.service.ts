import { prisma } from "../../../lib/prisma";
import { IcreateCategories } from "./category.interface";

//===============Create Category===============
const createCategory = async (data: IcreateCategories) => {
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
