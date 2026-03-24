import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../../generated/prisma/enums";
declare const auth: (...roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default auth;
//# sourceMappingURL=auth.d.ts.map