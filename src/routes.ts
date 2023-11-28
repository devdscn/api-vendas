import { Router } from 'express';
import { UsuarioController } from '@/controller/UsuarioController';

const routes = Router();

routes.post('/user/', new UsuarioController().create);

export default routes;
