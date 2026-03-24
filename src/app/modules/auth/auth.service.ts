import { prisma } from "../../../lib/prisma";

//=================Get User by Id=============
const getUserById = async (id: string) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: { id },
    include: {
      reviews: true,
      orders: true,
    },
  });

  return userData;
};

//=================Get my profile=============
const getMyProfile = async (id: string) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { id },
  });

  return userData;
};

export const authServices = {
  getUserById,
  getMyProfile,
};
