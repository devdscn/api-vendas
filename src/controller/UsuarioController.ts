import { prisma } from '@/database/prisma';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class UsuarioController {
  async store(req: Request, res: Response) {
    const { email, name, password } = req.body;

    const usuarioExists = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (usuarioExists) {
      return res.status(400).json({ msg: 'email já existe' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUsuario = await prisma.usuarios.create({
      data: { email, name, password: hashPassword },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...usuario } = newUsuario;

    return res.status(201).json(usuario);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Credencias inválidas' });
    }

    const usuario = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({ msg: 'email ou senha inválidos' });
    }

    const verifyPass = await bcrypt.compare(password, usuario.password);

    if (!verifyPass) {
      return res.status(401).json({ msg: 'email ou senha inválidos' });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY ?? '', {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    const { id, name } = usuario;

    return res.json({
      token: token,
      user: { id, name, email },
    });
  }
}
