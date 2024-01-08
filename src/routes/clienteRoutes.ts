import { Router } from 'express';
import { ClienteController } from '@/controller/ClienteController';
const routes = Router();

//routes.use(loginRequired);
routes.get('/', new ClienteController().index);
routes.get('/show/:idEmpresa/:idVendedor', new ClienteController().show);

export default routes;
