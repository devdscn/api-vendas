import { prisma } from '@/database/prisma';
import { Request, Response } from 'express';

export class ProdutoController {
  async index(req: Request, res: Response) {
    try {
      const produtos = await prisma.produtos.findMany({
        distinct: ['idProduto'],
        select: {
          id: true,
          idSecundario: true,
          idEmpresa: false,
          idFamilia: false,
          idProduto: true,
          idGrupo: true,
          acrescimo: false,
          ativo: false,
          desconto: false,
          estoque: false,
          fornecedor: false,
          linha: false,
          multiploVenda: false,
          nome: true,
          nomeGrupo: true,
          nomeFamilia: false,
          pesada: true,
          preco: false,
          referencia: true,
          unidadeCaixa: false,
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
      const _idEmpresa = Number(idEmpresa);
      if (!_idEmpresa) {
        console.log(`idempresa:${idEmpresa}<> outro:${_idEmpresa}`);
        return res.status(400).json({ message: 'id inválido' });
      }

      const produtos = await prisma.produtos.findMany({
        where: { idEmpresa: _idEmpresa, AND: { ativo: 'S' } },
      });

      res.json(produtos);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}
