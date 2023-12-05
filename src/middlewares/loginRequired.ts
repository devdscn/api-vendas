import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '@/database/prisma';

type JwtPayload = {
  id: string;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ msg: 'Login required' });
  }

  const token = authorization.split(' ')[1];
  try {
    const { id } = jwt.verify(
      token,
      process.env.SECRET_KEY ?? '',
    ) as JwtPayload;

    const usuario = await prisma.usuarios.findUnique({
      where: { id },
    });

    if (!usuario) {
      return res.status(401).json({ errors: 'Usuário inválido' });
    }

    const { name, email } = usuario;

    req.user = { id, name, email };
    return next();
  } catch (error) {
    return res.status(401).json({ errors: 'Token expirado ou inválido' });
  }
};
