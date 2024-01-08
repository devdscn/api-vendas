import { Router } from 'express';
import { ProdutoController } from '@/controller/ProdutoController';
import loginRequired from '@/middlewares/loginRequired';
const routes = Router();

routes.use(loginRequired);
routes.get('/', new ProdutoController().index);
routes.get('/show/:idEmpresa', new ProdutoController().show);

export default routes;
