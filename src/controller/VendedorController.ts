import { prisma } from '@/database/prisma';
import { Request, Response } from 'express';

export class VendedorController {
  async index(req: Request, res: Response) {
    try {
      const vendedores = await prisma.vendedores.findMany({
        distinct: ['nome'],
        select: {
          id: true,
          idVendedor: true,
          nome: true,
          fone: true,
        },
      });
      return res.json(vendedores);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async show(req: Request, res: Response) {
    const { idVendedor, idEmpresa } = req.params;
    if (!Number(idVendedor) || !Number(idEmpresa))
      return res.status(400).json({ message: 'id inválido' });
    try {
      const vendedor = await prisma.vendedores.findFirst({
        where: { idEmpresa: Number(idEmpresa), idVendedor: Number(idVendedor) },
      });
      return res.json(vendedor);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}
