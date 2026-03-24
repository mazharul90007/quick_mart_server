import express, { Router } from "express";
import { authControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";

const router: express.Router = express.Router();

//=================Get User by Id=============
router.get("/user/:id", auth(UserRole.ADMIN), authControllers.getUserById);

//=================Get my profile=============
router.get(
  "/me",
  auth(UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER),
  authControllers.getMyProfile,
);

export const authRoutes = router;
