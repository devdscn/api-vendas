import { Router } from 'express';
import { UsuarioController } from '@/controller/UsuarioController';
import loginRequired from './middlewares/loginRequired';

const routes = Router();

routes.post('/user', new UsuarioController().store);
routes.post('/login', new UsuarioController().login);

routes.use(loginRequired);
routes.get('/profile', new UsuarioController().getProfile);

export default routes;
