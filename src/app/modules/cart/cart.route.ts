import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { cartController } from "./cart.controller";

const router: Router = Router();

router.post("/add/:id", auth(UserRole.CUSTOMER), cartController.addItemToCart);
router.get("/", auth(UserRole.CUSTOMER), cartController.getMyCart);
router.delete(
  "/remove/:id",
  auth(UserRole.CUSTOMER),
  cartController.removeFromCart,
);

router.patch(
  "/update-quantity/:id",
  auth(UserRole.CUSTOMER),
  cartController.updateCartItemQuantity,
);

export const cartRoutes = router;
