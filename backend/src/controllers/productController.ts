import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, category, stock, image } = req.body;
  const product = await prisma.product.create({
    data: { name, description, price, category, stock, image },
  });
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const product = await prisma.product.update({
    where: { id: parseInt(id as string) },
    data,
  });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.product.delete({ where: { id: parseInt(id as string) } });
  res.json({ message: 'Product deleted' });
};
