import { prisma } from '@/database/prisma';
import { Request, Response } from 'express';

export class ClienteController {
  async index(req: Request, res: Response) {
    try {
      const skip = Number(req?.query?.skip) | 0;
      const take = Number(req?.query?.take) | 30;

      const clientes = await prisma.clientes.findMany({
        skip,
        take,
        orderBy: {
          razaSocial: 'asc',
        },
      });
      return res.json(clientes);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async show(req: Request, res: Response) {
    const { idVendedor, idEmpresa } = req.params;
    if (!Number(idVendedor) || !Number(idEmpresa))
      return res.status(400).json({ message: 'id inválido' });

    try {
      const clientes = await prisma.clientes.findMany({
        where: { idEmpresa: Number(idEmpresa), idVendedor: Number(idVendedor) },
      });

      return res.json(clientes);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}
