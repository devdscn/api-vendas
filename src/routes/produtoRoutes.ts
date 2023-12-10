import { Router } from 'express';
import { ProdutoController } from '@/controller/ProdutoController';
const routes = Router();

//routes.use(loginRequired);
routes.get('/index', new ProdutoController().index);
routes.get('/show/:idEmpresa', new ProdutoController().show);

export default routes;
