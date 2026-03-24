import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { adminController } from "./admin.controller";

const router: Router = Router();

//===============Get All Users===============
router.get("/users", auth(UserRole.ADMIN), adminController.getAllUsers);

//===============Update User Status===============
router.patch(
  "/users/:id",
  auth(UserRole.ADMIN),
  adminController.updateUserStatus,
);

//==============Update User Role=================
router.patch(
  "/users/role/:id",
  auth(UserRole.ADMIN),
  adminController.updateUserRole,
);

export const adminRoutes = router;
