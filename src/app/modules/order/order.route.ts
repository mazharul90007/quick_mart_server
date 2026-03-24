import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { orderController } from "./order.controller";

const router: Router = Router();
router.post(
  "/create",
  auth(UserRole.CUSTOMER),
  orderController.createOrderFromCart,
);

//============Get All Orders from Admin===============
router.get("/all", auth(UserRole.ADMIN), orderController.getAllOrders);

router.get("/", auth(UserRole.CUSTOMER), orderController.getMyOrders);
router.get(
  "/seller-orders",
  auth(UserRole.SELLER),
  orderController.getSellerOrders,
);
router.get("/:id", auth(UserRole.CUSTOMER), orderController.getOrderById);
router.patch(
  "/:id",
  auth(UserRole.SELLER, UserRole.ADMIN),
  orderController.updateOrderStatus,
);

router.patch(
  "/cancel/:id",
  auth(UserRole.CUSTOMER),
  orderController.cancelOrder,
);

export const orderRoutes = router;
