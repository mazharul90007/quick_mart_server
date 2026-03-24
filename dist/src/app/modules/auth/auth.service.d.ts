export declare const authServices: {
    getUserById: (id: string) => Promise<{
        orders: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../../../generated/prisma/enums").OrderStatus;
            orderNo: string;
            totalAmount: number;
            dueAmount: number;
            paymentStatus: import("../../../../generated/prisma/enums").PaymentStatus;
            contactNumber: string;
            shippingAddress: string;
            customerId: string;
        }[];
        reviews: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../../../generated/prisma/enums").ReviewStatus;
            userId: string;
            medicineId: string;
        }[];
    } & {
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        image: string | null;
        role: import("../../../../generated/prisma/enums").UserRole;
        status: import("../../../../generated/prisma/enums").UserStatus;
        phone: string | null;
    }>;
    getMyProfile: (id: string) => Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        image: string | null;
        role: import("../../../../generated/prisma/enums").UserRole;
        status: import("../../../../generated/prisma/enums").UserStatus;
        phone: string | null;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map