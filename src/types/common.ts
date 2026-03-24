import { UserRole } from "../../generated/prisma/enums";

export interface IauthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  emailVerified: boolean;
}
