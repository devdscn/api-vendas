import { prisma } from '@/database/prisma';
import { Request, Response } from 'express';

export class ProdutoController {
  async index(req: Request, res: Response) {
    try {
      const produtos = await prisma.produtos.findMany({
        distinct: ['idProduto'],
        select: {
          id: true,
          idProduto: true,
          idSecundario: true,
          nome: true,
          idGrupo: true,
          nomeGrupo: true,
          referencia: true,
          unidadeFisica: true,
          unidadeVenda: true,
        },
        orderBy: [{ nomeGrupo: 'asc' }, { nome: 'asc' }],
      });
      return res.json(produtos);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { idEmpresa } = req.params;
      if (!Number(idEmpresa))
        return res.status(400).json({ message: 'id inválido' });

      const produtos = await prisma.produtos.findMany({
        where: { ativo: 'S' },
      });

      res.json(produtos);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}
