import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

export const createOrder = async (req: AuthRequest, res: Response) => {
  const { total, items } = req.body;
  const userId = req.user!.id;

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      items,
      status: 'PENDING',
    },
  });
  res.json(order);
};

export const getOrders = async (req: AuthRequest, res: Response) => {
  const role = req.user!.role;
  const userId = req.user!.id;

  if (role === 'ADMIN') {
    const orders = await prisma.order.findMany({ include: { user: true } });
    return res.json(orders);
  } else if (role === 'DELIVERY') {
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          { status: 'PENDING' },
          { deliveryId: userId }
        ]
      },
      include: { user: true }
    });
    return res.json(orders);
  } else {
    const orders = await prisma.order.findMany({ where: { userId } });
    return res.json(orders);
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user!.id;
  const role = req.user!.role;

  const updateData: any = { status };
  if (role === 'DELIVERY') {
    updateData.deliveryId = userId;
  }

  const order = await prisma.order.update({
    where: { id: parseInt(id as string) },
    data: updateData,
  });
  res.json(order);
};
