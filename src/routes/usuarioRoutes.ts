import { Router } from 'express';
import { UsuarioController } from '@/controller/UsuarioController';
import loginRequired from '../middlewares/loginRequired';

const routes = Router();

routes.post('/store', new UsuarioController().store);
routes.post('/login', new UsuarioController().login);

routes.use(loginRequired);
routes.get('/', new UsuarioController().index);
routes.get('/profile', new UsuarioController().getProfile);
routes.delete('/:id', new UsuarioController().delete);
routes.put('/:id', new UsuarioController().update);

export default routes;
