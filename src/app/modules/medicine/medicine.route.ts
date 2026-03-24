import { Router } from "express";
import { medicineController } from "./medicine.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";

const router: Router = Router();

router.post(
  "/",
  auth(UserRole.SELLER, UserRole.ADMIN),
  medicineController.createMedicine,
);

router.get("/", medicineController.getAllMedicines);

router.get(
  "/seller-medicines",
  auth(UserRole.SELLER),
  medicineController.getSellerMedicines,
);

router.get("/:id", medicineController.getMedicineById);
router.patch("/:id", auth(UserRole.SELLER), medicineController.updateMedicine);
router.delete(
  "/:id",
  auth(UserRole.SELLER, UserRole.ADMIN),
  medicineController.removeMedicine,
);

export const medicineRoutes = router;
