import { OrderStatus } from "../../../../generated/prisma/enums";
export declare const orderService: {
    createOrderFromCart: (userId: string, payload: {
        cartItemIds: string[];
        shippingAddress: string;
        contactNumber: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: OrderStatus;
        orderNo: string;
        totalAmount: number;
        dueAmount: number;
        paymentStatus: import("../../../../generated/prisma/enums").PaymentStatus;
        contactNumber: string;
        shippingAddress: string;
        customerId: string;
    }>;
    getMyOrders: (userId: string, filters: any, options: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: ({
            orderItems: ({
                medicine: {
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
                };
            } & {
                id: string;
                quantity: number;
                orderId: string;
                medicineId: string;
                unitPrice: number;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: OrderStatus;
            orderNo: string;
            totalAmount: number;
            dueAmount: number;
            paymentStatus: import("../../../../generated/prisma/enums").PaymentStatus;
            contactNumber: string;
            shippingAddress: string;
            customerId: string;
        })[];
    }>;
    getOrderById: (orderId: string, userId: string) => Promise<{
        orderItems: ({
            medicine: {
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
            };
        } & {
            id: string;
            quantity: number;
            orderId: string;
            medicineId: string;
            unitPrice: number;
        })[];
        customer: {
            name: string | null;
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: OrderStatus;
        orderNo: string;
        totalAmount: number;
        dueAmount: number;
        paymentStatus: import("../../../../generated/prisma/enums").PaymentStatus;
        contactNumber: string;
        shippingAddress: string;
        customerId: string;
    }>;
    updateOrderStatus: (orderId: string, status: OrderStatus, user: {
        id: string;
        role: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: OrderStatus;
        orderNo: string;
        totalAmount: number;
        dueAmount: number;
        paymentStatus: import("../../../../generated/prisma/enums").PaymentStatus;
        contactNumber: string;
        shippingAddress: string;
        customerId: string;
    }>;
    getSellerOrders: (sellerId: string, filters: any, options: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: ({
            orderItems: ({
                medicine: {
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
                };
            } & {
                id: string;
                quantity: number;
                orderId: string;
                medicineId: string;
                unitPrice: number;
            })[];
            customer: {
                name: string | null;
                id: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: OrderStatus;
            orderNo: string;
            totalAmount: number;
            dueAmount: number;
            paymentStatus: import("../../../../generated/prisma/enums").PaymentStatus;
            contactNumber: string;
            shippingAddress: string;
            customerId: string;
        })[];
    }>;
    cancelOrder: (orderId: string, userId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: OrderStatus;
        orderNo: string;
        totalAmount: number;
        dueAmount: number;
        paymentStatus: import("../../../../generated/prisma/enums").PaymentStatus;
        contactNumber: string;
        shippingAddress: string;
        customerId: string;
    }>;
    getAllOrders: (filters: any, options: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: ({
            orderItems: ({
                medicine: {
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
                };
            } & {
                id: string;
                quantity: number;
                orderId: string;
                medicineId: string;
                unitPrice: number;
            })[];
            customer: {
                name: string | null;
                id: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: OrderStatus;
            orderNo: string;
            totalAmount: number;
            dueAmount: number;
            paymentStatus: import("../../../../generated/prisma/enums").PaymentStatus;
            contactNumber: string;
            shippingAddress: string;
            customerId: string;
        })[];
    }>;
};
//# sourceMappingURL=order.service.d.ts.map