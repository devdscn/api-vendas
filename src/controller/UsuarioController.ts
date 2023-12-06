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
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUsuario = await prisma.usuarios.create({
        data: { email, name, password: hashPassword },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...usuario } = newUsuario;

      return res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({
        msg: error,
      });
    }
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

  async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }

  async index(req: Request, res: Response) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const usuarios = await prisma.usuarios.findMany({
        select: { id: true, name: true, email: true },
      });
      return res.json(usuarios);
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ msg: 'ID não informado' });

      const usuario = await prisma.usuarios.findUnique({ where: { id: id } });

      if (!usuario) return res.json({ msg: 'usuário nao existe' });
      await prisma.usuarios.delete({ where: { id: usuario.id } });

      return res.json({ deleted: usuario.email });
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ msg: 'id não informado' });

      const usuario = await prisma.usuarios.findUnique({ where: { id: id } });

      if (!usuario) return res.json({ msg: 'usuário nao existe' });

      const { email, name, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);

      const updateUsuario = await prisma.usuarios.update({
        where: { id: id },
        data: { name, email, password: hashPassword },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...newUsuario } = updateUsuario;

      return res.json(newUsuario);
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  }
}
