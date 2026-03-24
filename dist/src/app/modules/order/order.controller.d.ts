import { Request, Response } from "express";
export declare const orderController: {
    createOrderFromCart: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getMyOrders: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getOrderById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateOrderStatus: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getSellerOrders: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    cancelOrder: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllOrders: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=order.controller.d.ts.map