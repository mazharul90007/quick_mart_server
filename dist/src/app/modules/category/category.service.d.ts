import { IcreateCategories } from "./category.interface";
export declare const categoryService: {
    createCategory: (data: IcreateCategories) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryName: string;
        categoryDetails: string | null;
        categoryStatus: import("../../../../generated/prisma/enums").CategoryStatus;
    }>;
    getAllCategories: () => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryName: string;
        categoryDetails: string | null;
        categoryStatus: import("../../../../generated/prisma/enums").CategoryStatus;
    }[]>;
};
//# sourceMappingURL=category.service.d.ts.map