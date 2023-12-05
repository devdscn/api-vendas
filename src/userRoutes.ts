import { Router } from 'express';
import { UsuarioController } from '@/controller/UsuarioController';

const routes = Router();

routes.post('/user', new UsuarioController().store);
routes.post('/login', new UsuarioController().login);

export default routes;
