import { Request, Response } from "express";
export declare const cartController: {
    addItemToCart: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getMyCart: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    removeFromCart: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateCartItemQuantity: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=cart.controller.d.ts.map