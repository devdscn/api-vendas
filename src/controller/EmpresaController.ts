import { prisma } from '@/database/prisma';
import { Request, Response } from 'express';

export class EmpresaController {
  async index(req: Request, res: Response) {
    try {
      const empresas = await prisma.empresas.findMany();
      return res.json(empresas);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!parseInt(id))
        return res.status(400).json({ message: 'ID inválido' });

      const empresa = await prisma.empresas.findUnique({
        where: { id: parseInt(id) },
      });
      if (!empresa) return res.json({ message: `não existe empresa id:${id}` });
      return res.json(empresa);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
