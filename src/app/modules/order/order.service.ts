import { OrderStatus, UserRole } from "../../../../generated/prisma/enums";
import { OrderWhereInput } from "../../../../generated/prisma/models";
import { prisma } from "../../../lib/prisma";
import calculatePagination from "../../helpers/paginationHelpers";
import { generatedOrderNo } from "./order.utils";

//=================Create Order from Cart==================
const createOrderFromCart = async (
  userId: string,
  payload: {
    cartItemIds: string[];
    shippingAddress: string;
    contactNumber: string;
  },
) => {
  const { cartItemIds, shippingAddress, contactNumber } = payload;
  return await prisma.$transaction(async (tx) => {
    //Fetch only the selected cartItems and the medicine info
    const selectedCartItem = await tx.cartItem.findMany({
      where: {
        id: { in: cartItemIds },
        cart: { userId },
      },
      include: { medicine: true },
    });

    if (selectedCartItem.length === 0) {
      throw new Error("No valid items found");
    }

    //Calculate price
    let totalAmount = 0;
    for (const item of selectedCartItem) {
      totalAmount += item.medicine.price * item.quantity;
    }

    //Create Oreder
    const order = await tx.order.create({
      data: {
        orderNo: generatedOrderNo(),
        totalAmount,
        dueAmount: totalAmount,
        customerId: userId,
        shippingAddress,
        contactNumber,
      },
    });

    //Transform CartItem into OrderItems
    for (const item of selectedCartItem) {
      await tx.orderItem.create({
        data: {
          orderId: order.id,
          medicineId: item.medicineId,
          quantity: item.quantity,
          unitPrice: item.medicine.price,
        },
      });
    }

    //remove the ordered items from cart
    await tx.cartItem.deleteMany({
      where: { id: { in: cartItemIds } },
    });

    return order;
  });
};

//===============Get My Orders==================
const getMyOrders = async (userId: string, filters: any, options: any) => {
  const { searchTerm, date, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  //verify ownership and search by status, paymentStatus, and date
  const where: any = {
    customerId: userId,
    ...filterData,
  };

  // Filter by a specific date (start of day to end of day)
  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    where.createdAt = {
      gte: startOfDay,
      lte: endOfDay,
    };
  }

  //search by order no
  if (searchTerm) {
    where.orderNo = {
      contains: searchTerm,
      mode: "insensitive",
    };
  }

  const result = await prisma.order.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      orderItems: {
        include: {
          medicine: true,
        },
      },
    },
  });

  const total = await prisma.order.count({ where });

  return {
    meta: { page, limit, total },
    data: result,
  };
};

//================Get Order details by Id==============
const getOrderById = async (orderId: string, userId: string) => {
  const result = await prisma.order.findUniqueOrThrow({
    where: {
      id: orderId,
      customerId: userId,
    },
    include: {
      orderItems: {
        include: {
          medicine: true,
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return result;
};

//===================Update Order status==================
const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  user: { id: string; role: string },
) => {
  // If seller, verify they own at least one item in this order
  if (user.role === UserRole.SELLER) {
    const isOwnerOfOrderItems = await prisma.orderItem.findFirst({
      where: {
        orderId: orderId,
        medicine: {
          sellerId: user.id,
        },
      },
    });

    if (!isOwnerOfOrderItems) {
      throw new Error("You are not authorized to update this order");
    }
  }

  //  Update the order status
  const result = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  return result;
};

//===============Get My Orders (Seller)==================
const getSellerOrders = async (
  sellerId: string,
  filters: any,
  options: any,
) => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const where: any = {
    orderItems: {
      some: {
        medicine: {
          sellerId,
        },
      },
    },
    ...filterData,
  };

  if (searchTerm) {
    where.orderNo = {
      contains: searchTerm,
      mode: "insensitive",
    };
  }

  const result = await prisma.order.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      orderItems: {
        where: {
          medicine: {
            sellerId,
          },
        },
        include: {
          medicine: true,
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  const total = await prisma.order.count({ where });

  return {
    meta: { page, limit, total },
    data: result,
  };
};

//====================Cancel Order=================
const cancelOrder = async (orderId: string, userId: string) => {
  // verify ownership
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
      customerId: userId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // check if the order is in PENDING stage
  if (order.status !== OrderStatus.PENDING) {
    throw new Error(`Cannot cancel order in ${order.status} stage`);
  }

  // Update status to CANCELED
  const result = await prisma.order.update({
    where: { id: orderId },
    data: { status: OrderStatus.CANCELED },
  });

  return result;
};

//============Get All Orders from Admin===============
const getAllOrders = async (filters: any, options: any) => {
  const { searchTerm, date, status, paymentStatus } = filters;
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const where: OrderWhereInput = {};

  // Search by orderNo
  if (searchTerm) {
    where.orderNo = {
      contains: searchTerm,
      mode: "insensitive",
    };
  }

  //Search by status
  if (status) {
    where.status = status;
  }

  //Search by paymentStatus
  if (paymentStatus) {
    where.paymentStatus = paymentStatus;
  }

  // Date filtering (specific day)
  if (date) {
    const startOfDay = new Date(date as string);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date as string);
    endOfDay.setHours(23, 59, 59, 999);

    where.createdAt = {
      gte: startOfDay,
      lte: endOfDay,
    };
  }

  const result = await prisma.order.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      orderItems: {
        include: {
          medicine: true,
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  const total = await prisma.order.count({ where });

  return {
    meta: { page, limit, total },
    data: result,
  };
};

export const orderService = {
  createOrderFromCart,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getSellerOrders,
  cancelOrder,
  getAllOrders,
};
