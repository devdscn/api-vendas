import { prisma } from '@/database/prisma';
import { Request, Response } from 'express';

export class UsuarioController {
  async create(req: Request, res: Response) {
    const { email, name, password } = req.body;

    const usuario = await prisma.usuarios.create({
      data: { email, name, password },
    });

    return res.json(usuario);
  }
}
