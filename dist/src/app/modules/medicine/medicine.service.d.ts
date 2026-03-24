import { IauthUser } from "../../../types/common";
import { IcreateMedicine, IupdateMedicine } from "./medicine.type";
export declare const medicineService: {
    createMedicine: (payload: IcreateMedicine) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("../../../../generated/prisma/enums").MedicineType;
        generic_name: string | null;
        company: string;
        categoryId: string;
        popular: boolean | null;
        strength: string | null;
        photoUrl: string | null;
        quantity: number;
        price: number;
        Indications: string | null;
        Pharmacology: string | null;
        dosage: string | null;
        side_effects: string | null;
        rating: number | null;
        warnings: string | null;
        sellerId: string;
    }>;
    getAllMedicines: (filters: any, options: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: ({
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                categoryName: string;
                categoryDetails: string | null;
                categoryStatus: import("../../../../generated/prisma/enums").CategoryStatus;
            };
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import("../../../../generated/prisma/enums").MedicineType;
            generic_name: string | null;
            company: string;
            categoryId: string;
            popular: boolean | null;
            strength: string | null;
            photoUrl: string | null;
            quantity: number;
            price: number;
            Indications: string | null;
            Pharmacology: string | null;
            dosage: string | null;
            side_effects: string | null;
            rating: number | null;
            warnings: string | null;
            sellerId: string;
        })[];
    }>;
    getMedicineById: (id: string) => Promise<({
        category: {
            categoryName: string;
            categoryDetails: string | null;
        };
        seller: {
            name: string | null;
            id: string;
            email: string;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("../../../../generated/prisma/enums").MedicineType;
        generic_name: string | null;
        company: string;
        categoryId: string;
        popular: boolean | null;
        strength: string | null;
        photoUrl: string | null;
        quantity: number;
        price: number;
        Indications: string | null;
        Pharmacology: string | null;
        dosage: string | null;
        side_effects: string | null;
        rating: number | null;
        warnings: string | null;
        sellerId: string;
    }) | null>;
    updateMedicine: (id: string, sellerId: string, payload: IupdateMedicine) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("../../../../generated/prisma/enums").MedicineType;
        generic_name: string | null;
        company: string;
        categoryId: string;
        popular: boolean | null;
        strength: string | null;
        photoUrl: string | null;
        quantity: number;
        price: number;
        Indications: string | null;
        Pharmacology: string | null;
        dosage: string | null;
        side_effects: string | null;
        rating: number | null;
        warnings: string | null;
        sellerId: string;
    }>;
    removeMedicine: (id: string, currentUser: IauthUser) => Promise<void>;
    getSellerMedicines: (sellerId: string, filters: any, options: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: ({
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                categoryName: string;
                categoryDetails: string | null;
                categoryStatus: import("../../../../generated/prisma/enums").CategoryStatus;
            };
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import("../../../../generated/prisma/enums").MedicineType;
            generic_name: string | null;
            company: string;
            categoryId: string;
            popular: boolean | null;
            strength: string | null;
            photoUrl: string | null;
            quantity: number;
            price: number;
            Indications: string | null;
            Pharmacology: string | null;
            dosage: string | null;
            side_effects: string | null;
            rating: number | null;
            warnings: string | null;
            sellerId: string;
        })[];
    }>;
};
//# sourceMappingURL=medicine.service.d.ts.map